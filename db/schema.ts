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

// —— Business function demos (How This Business Runs section) ——

/**
 * Which of the 6 landing categories a business function demo belongs to.
 */
export const businessFunctionSlugEnum = pgEnum("business_function_slug", [
  "recruitment-hr",
  "marketing-seo",
  "customer-support",
  "ecommerce",
  "operations",
  "finance",
]);

export type BusinessFunctionSlug = (typeof businessFunctionSlugEnum.enumValues)[number];

export type BusinessFunctionDemoMetadata = {
  tags?: string[];
  url?: string;
  imageUrl?: string;
};

export const businessFunctionDemos = pgTable("business_function_demos", {
  id: uuid("id").defaultRandom().primaryKey(),
  categorySlug: businessFunctionSlugEnum("category_slug").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  narrative: text("narrative").notNull(),
  metadata: jsonb("metadata").$type<BusinessFunctionDemoMetadata>(),
  sortOrder: smallint("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type BusinessFunctionDemoRow = typeof businessFunctionDemos.$inferSelect;
export type NewBusinessFunctionDemo = typeof businessFunctionDemos.$inferInsert;

// —— AI agents (Digital Workforce section) ——

export const agentStatusEnum = pgEnum("agent_status", ["active", "busy", "offline"]);

export type AgentStatus = (typeof agentStatusEnum.enumValues)[number];

/**
 * AI agents shown in the "Meet Our AI Workforce" section.
 * Categories (e.g. by department) can be added later via a column or relation.
 */
export const aiAgents = pgTable("ai_agents", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  department: text("department").notNull(),
  status: agentStatusEnum("status").notNull().default("active"),
  description: text("description").notNull(),
  welcomeMessage: text("welcome_message"),
  imageUrl: text("image_url"),
  capabilities: jsonb("capabilities").$type<string[]>(),
  actions: jsonb("actions").$type<string[]>(),
  sortOrder: smallint("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type AiAgentRow = typeof aiAgents.$inferSelect;
export type NewAiAgent = typeof aiAgents.$inferInsert;
