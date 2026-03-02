// src/routes/members.ts
import { Router } from "express";
import { db } from "../db/client";
import { members, membership_categories } from "../db/schema";
import { generateToken } from "../utils/token";
import { sendVerificationEmail } from "../services/email";
import { signJwt } from "../services/jwt";
import { eq } from "drizzle-orm";

const router = Router();

// ---------------------------
// ✅ Debug Middleware for Router
// ---------------------------
router.use((req, res, next) => {
  console.log(`[MEMBERS ROUTER] ${req.method} ${req.url}`);
  next();
});

/**
 * POST /api/members/register
 */
router.post("/register", async (req, res) => {
  console.log("🔹 /register hit with body:", req.body);

  try {
    const { full_name, email, category_id } = req.body;

    if (!full_name || !email || !category_id) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Prevent duplicate email
    const existing = await db
      .select()
      .from(members)
      .where(eq(members.email, email));

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const verification_token = generateToken();

    await db.insert(members).values({
      full_name,
      email,
      category_id,
      verification_token,
      is_verified: false,
    });

    // For debug: log the email instead of sending it
    console.log(`📧 Sending verification email to ${email} with token: ${verification_token}`);
    // await sendVerificationEmail(email, verification_token); // Uncomment if you want real email

    res.status(201).json({
      success: true,
      message: "Registration successful. Check your email to verify.",
    });
  } catch (error) {
    console.error("❌ Registration failed:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
});

/**
 * GET /api/members/verify
 */
router.get("/verify", async (req, res) => {
  try {
    const token = req.query.token as string;

    if (!token) return res.status(400).json({ message: "Token missing" });

    const [member] = await db
      .select()
      .from(members)
      .where(eq(members.verification_token, token));

    if (!member) return res.status(400).json({ message: "Invalid token" });

    await db
      .update(members)
      .set({ is_verified: true, verification_token: null })
      .where(eq(members.id, member.id));

    const jwt = signJwt({ id: member.id, email: member.email });

    res
      .cookie("token", jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("❌ Verification failed:", error);
    res.status(500).json({ message: "Verification failed" });
  }
});

/**
 * GET /api/members
 */
router.get("/", async (req, res) => {
  try {
    const data = await db
      .select({
        id: members.id,
        full_name: members.full_name,
        email: members.email,
        category: membership_categories.name,
        joined_at: members.joined_at,
      })
      .from(members)
      .leftJoin(
        membership_categories,
        eq(members.category_id, membership_categories.id)
      );

    res.json({ success: true, data });
  } catch (error) {
    console.error("❌ Failed to fetch members:", error);
    res.status(500).json({ success: false, message: "Failed to fetch members" });
  }
});

export default router;
