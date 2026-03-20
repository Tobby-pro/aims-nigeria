// src/routes/courses.ts
import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { requireVerified } from "../middleware/verified";
import { db } from "../db/client";
import { enrolled_fees } from "../db/schema"; // updated
import { eq } from "drizzle-orm";

const router = Router();

// ✅ Get enrolled fees (or membership activations) for logged-in member
router.get("/my-fees", requireAuth, requireVerified, async (req, res) => {
  try {
    const user = (req as any).user;

    const fees = await db
      .select()
      .from(enrolled_fees)
      .where(eq(enrolled_fees.member_id, user.id));

    res.json({
      success: true,
      data: fees,
    });

  } catch (err) {
    console.error("Failed to fetch enrolled fees", err);
    res.status(500).json({ success: false, message: "Failed to fetch enrolled fees" });
  }
});

export default router;