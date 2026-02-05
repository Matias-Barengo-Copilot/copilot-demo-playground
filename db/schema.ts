import {
  jsonb,
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * User roles for authorization.
 */
export const userRoleEnum = pgEnum("user_role", ["admin", "presenter", "viewer"]);

/**
 * Users allowed to sign in (whitelist). Includes role for authorization.
 */
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  role: userRoleEnum("role").notNull().default("viewer"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type UserRole = (typeof userRoleEnum.enumValues)[number];
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// —— Demos (portal catalog; structure may evolve when real demos arrive) ——

export const demoCategoryEnum = pgEnum("demo_category", [
  "business_function",
  "ai_agent",
  "industry",
]);

/**
 * Category-specific fields live in metadata so we can add new fields without migrations.
 * business_function: { tags?: string[] }
 * ai_agent: { agentName: string }
 * industry: { externalUrl: string; industry: string; customerStory: string }
 */
export type DemoMetadata = {
  tags?: string[];
  agentName?: string;
  externalUrl?: string;
  industry?: string;
  customerStory?: string;
};

export const demos = pgTable("demos", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  category: demoCategoryEnum("category").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  narrative: text("narrative").notNull(),
  metadata: jsonb("metadata").$type<DemoMetadata>(),
  sortOrder: smallint("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type DemoCategory = (typeof demoCategoryEnum.enumValues)[number];
export type Demo = typeof demos.$inferSelect;
export type NewDemo = typeof demos.$inferInsert;
