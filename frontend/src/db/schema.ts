import {
  pgTable,
  serial,
  text,
  boolean,
  timestamp,
  integer,
  varchar,
} from "drizzle-orm/pg-core";

// ─── Posts ───────────────────────────────────────────────────────────────────
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt").notNull().default(""),
  body: text("body").notNull().default(""),
  coverImage: text("cover_image").default(""),
  category: varchar("category", { length: 100 }).notNull().default("General"),
  tags: text("tags").default(""), // comma-separated
  published: boolean("published").notNull().default(false),
  featured: boolean("featured").notNull().default(false),
  views: integer("views").notNull().default(0),
  author: varchar("author", { length: 150 }).notNull().default("Canada Easy Guide"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Ad Placements ────────────────────────────────────────────────────────────
export const adPlacements = pgTable("ad_placements", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(), // e.g. "header", "sidebar", "in-post", "footer"
  adsterraCode: text("adsterra_code").notNull().default(""),
  isActive: boolean("is_active").notNull().default(true),
  applyToAll: boolean("apply_to_all").notNull().default(true), // auto-apply to all posts
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Admin Users ──────────────────────────────────────────────────────────────
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 150 }).notNull().default("Admin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Site Settings ────────────────────────────────────────────────────────────
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value").notNull().default(""),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Categories ───────────────────────────────────────────────────────────────
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description").default(""),
  color: varchar("color", { length: 20 }).default("#1a73e8"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
