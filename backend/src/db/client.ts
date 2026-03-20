// src/db/client.ts
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from "dotenv";
import { members, payments, enrolled_fees } from "./schema"; // import tables

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "aimsn_user",
  password: process.env.DB_PASSWORD || "aimsn_password",
  database: process.env.DB_NAME || "aimsn_db",
});

// ✅ Tell Drizzle about your schema so TypeScript recognizes all tables
export const db = drizzle(pool, {
  schema: {
    members,
    payments,
    enrolled_fees,
  },
});