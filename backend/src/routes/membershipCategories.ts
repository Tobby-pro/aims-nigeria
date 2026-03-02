import { Router } from "express";
import { db } from "../db/client";
import { membership_categories } from "../db/schema";

const router = Router();

/**
 * GET /api/membership-categories
 * Fetch all membership categories
 */
router.get("/", async (req, res) => {
  try {
    const categories = await db
      .select()
      .from(membership_categories);

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("❌ Failed to fetch membership categories:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch membership categories",
    });
  }
});

export default router;
