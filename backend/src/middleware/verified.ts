// src/middleware/verified.ts
import { Request, Response, NextFunction } from "express";
import { db } from "../db/client";
import { members } from "../db/schema";
import { eq } from "drizzle-orm";

export const requireVerified = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;

  const [member] = await db
    .select()
    .from(members)
    .where(eq(members.id, user.id));

  if (!member || !member.is_verified) {
    return res.status(403).json({
      success: false,
      message: "Account not verified",
    });
  }

  next();
};