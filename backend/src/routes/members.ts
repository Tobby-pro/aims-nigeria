// src/routes/members.ts
import { Router } from "express";
import { db } from "../db/client";
import { members, enrolled_fees } from "../db/schema";
import { signJwt } from "../services/jwt";
import { sendVerificationEmail, sendWelcomeEmail } from "../services/email";
import { generateToken } from "../utils/token";
import { requireAuth } from "../middleware/auth";
import { requireVerified } from "../middleware/verified";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

const router = Router();

router.use((req, res, next) => {
  console.log(`[MEMBERS ROUTER] ${req.method} ${req.url}`);
  next();
});

/**
 * REGISTER
 * POST /api/members/register
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

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

    const password_hash = await bcrypt.hash(password, 10);
    const verification_token = generateToken();

    await db.insert(members).values({
      email,
      password_hash,
      verification_token,
      is_verified: false,
    });

    // ✅ Send verification email
    await sendVerificationEmail(email, verification_token);

    res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
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
 * VERIFY EMAIL
 * GET /api/members/verify?token=...
 */
router.get("/verify", async (req, res) => {
  try {
    const token = req.query.token as string;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token missing",
      });
    }

    const [member] = await db
      .select()
      .from(members)
      .where(eq(members.verification_token, token));

    if (!member) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    // ✅ Mark as verified
    await db
      .update(members)
      .set({
        is_verified: true,
        verification_token: null,
      })
      .where(eq(members.id, member.id));

    // ✅ Send welcome email
    await sendWelcomeEmail(member.email);

    // ✅ Generate JWT
    const jwt = signJwt({
      id: member.id,
      email: member.email,
    });

    // ✅ Set auth cookie
    res.cookie("token", jwt, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    // ✅ REDIRECT TO FRONTEND (BEST UX)
    return res.redirect(
      "http://localhost:5173/dashboard?verified=true"
    );

  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
});

/**
 * LOGIN
 * POST /api/members/login
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await db
      .select()
      .from(members)
      .where(eq(members.email, email));

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.is_verified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = signJwt({
      id: user.id,
      email: user.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error("❌ Login failed:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});

/**
 * CURRENT USER
 * GET /api/members/me
 */
router.get("/me", requireAuth, requireVerified, async (req, res) => {
  try {
    const user = (req as any).user;

    const [member] = await db
      .select({
        id: members.id,
        email: members.email,
      })
      .from(members)
      .where(eq(members.id, user.id));

    const membership = await db.query.enrolled_fees.findFirst({
      where: eq(enrolled_fees.member_id, user.id),
    });

    res.json({
      success: true,
      data: {
        ...member,
        is_member: !!membership,
      },
    });
  } catch (error) {
    console.error("Failed to fetch /me:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user info",
    });
  }
});

/**
 * LOGOUT
 * POST /api/members/logout
 */
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });

  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

export default router;