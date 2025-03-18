import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const texts = sqliteTable("Texts", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  hasSpecialChars: integer("has_special_chars", { mode: "boolean" }).notNull().$defaultFn(() => false),
  language: text("language").notNull(),
  difficulty: text("difficulty").notNull(),
  type: text("type").notNull(),
});

export const users = sqliteTable("Users", {
  id: integer("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  password: text("password").notNull().unique(),
  role: text("role").notNull().$defaultFn(() => "user"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const Text = typeof texts.$inferSelect;
export const User = typeof users.$inferSelect;
