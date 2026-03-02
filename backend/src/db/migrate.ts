import { db } from "./client";

async function migrate() {
  console.log("🚀 Creating tables...");

  // 1️⃣ Create enum safely
  await db.execute(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'membership_category_enum') THEN
        CREATE TYPE membership_category_enum AS ENUM (
          'ASSOCIATE', 'GRADUATE', 'STUDENT', 'FULL_MEMBER', 'FELLOW', 'CORPORATE_MEMBER', 'CORPORATE_FELLOW'
        );
      END IF;
    END
    $$;
  `);

  // 2️⃣ Create tables
  await db.execute(`
    CREATE TABLE IF NOT EXISTS membership_categories (
      id SERIAL PRIMARY KEY,
      name membership_category_enum NOT NULL,
      description TEXT
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS members (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      category_id INTEGER NOT NULL REFERENCES membership_categories(id),
      joined_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS membership_benefits (
      id SERIAL PRIMARY KEY,
      category_id INTEGER NOT NULL REFERENCES membership_categories(id),
      benefit TEXT NOT NULL
    );
  `);

  console.log("✅ Tables created successfully");
}

migrate()
  .catch((err) => console.error("❌ Migration failed:", err))
  .finally(() => process.exit(0));
