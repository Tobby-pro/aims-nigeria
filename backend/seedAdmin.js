const bcrypt = require("bcrypt");
const { db } = require("./src/db/client");
const { members } = require("./src/db/schema");
const { eq } = require("drizzle-orm");

async function seedAdmin() {
  try {
    const email = "admin@aimsn.com";
    const password = "DatA743465@"; // 🔴 change if you want

    // 🔍 check if admin already exists
    const existing = await db
      .select()
      .from(members)
      .where(eq(members.email, email));

    if (existing.length > 0) {
      console.log("⚠️ Admin already exists");
      return;
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ insert admin
    await db.insert(members).values({
      email,
      password_hash: hashedPassword,
      is_verified: true,
      is_admin: true,
    });

    console.log("✅ Admin created successfully");
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    process.exit();
  }
}

seedAdmin();