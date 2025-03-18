import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const texts = sqliteTable("Texts", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  hasSpecialChars: integer("has_special_chars", { mode: "boolean" }).notNull().$defaultFn(() => false),
  language: text("language"),
  difficulty: text("difficulty"),
  type: text("type"),
});