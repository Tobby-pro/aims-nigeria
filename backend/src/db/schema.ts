import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

// ---------------------------
// MEMBERS TABLE
// ---------------------------
export const members = pgTable(
  "members",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password_hash: text("password_hash").notNull(),
    is_verified: boolean("is_verified").notNull().default(false),
    verification_token: text("verification_token"),
    verification_token_expires_at: timestamp("verification_token_expires_at"),
    created_at: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: index("members_email_idx").on(table.email),
  })
);

// ---------------------------
// PAYMENTS TABLE
// ---------------------------
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  member_id: serial("member_id").notNull(),
  fee_type: varchar("fee_type", { length: 50 }).notNull(), // changed from program_id
  reference: varchar("reference", { length: 100 }).notNull(),
  amount: text("amount").notNull(),
  status: varchar("status", { length: 20 }).notNull(), // pending, success, failed
  created_at: timestamp("created_at").defaultNow(),
});

// ---------------------------
// ENROLLED FEES TABLE
// ---------------------------
export const enrolled_fees = pgTable("enrolled_fees", {
  id: serial("id").primaryKey(),
  member_id: serial("member_id").notNull(),
  fee_type: varchar("fee_type", { length: 50 }).notNull(), // changed from program_id
  enrolled_at: timestamp("enrolled_at").defaultNow(),
});