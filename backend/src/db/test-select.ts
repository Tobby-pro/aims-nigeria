// src/db/test-select.ts
import { db } from "./client";
import { membership_categories } from "./schema";

async function testSelect() {
  try {
    const categories = await db
      .select()
      .from(membership_categories);

    console.log("📦 Membership Categories:");
    console.table(categories);
  } catch (error) {
    console.error("❌ Select test failed:", error);
  } finally {
    process.exit(0);
  }
}

testSelect();
