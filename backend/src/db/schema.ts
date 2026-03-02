// src/db/schema.ts

import {
  pgTable,
  serial,
  text,
  integer,
  varchar,
  timestamp,
  boolean,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

/**
 * ENUM
 */
export const membershipCategoryEnum = pgEnum("membership_category_enum", [
  "ASSOCIATE",
  "GRADUATE",
  "STUDENT",
  "FULL_MEMBER",
  "FELLOW",
  "CORPORATE_MEMBER",
  "CORPORATE_FELLOW",
]);

/**
 * MEMBERSHIP CATEGORIES TABLE
 */
export const membership_categories = pgTable("membership_categories", {
  id: serial("id").primaryKey(),

  name: membershipCategoryEnum("name").notNull(),

  description: text("description"),
});

/**
 * MEMBERS TABLE
 */
export const members = pgTable(
  "members",
  {
    id: serial("id").primaryKey(),

    full_name: varchar("full_name", { length: 255 }).notNull(),

    email: varchar("email", { length: 255 })
      .notNull()
      .unique(),

    category_id: integer("category_id")
      .notNull()
      .references(() => membership_categories.id),

    /**
     * Email Verification System
     */
    is_verified: boolean("is_verified")
      .notNull()
      .default(false),

    verification_token: text("verification_token"),

    joined_at: timestamp("joined_at")
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      emailIdx: index("members_email_idx").on(table.email),
      verificationTokenIdx: index("members_verification_token_idx").on(
        table.verification_token
      ),
    };
  }
);
