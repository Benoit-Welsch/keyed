PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_Texts` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`has_special_chars` integer NOT NULL,
	`language` text,
	`difficulty` text,
	`type` text
);
--> statement-breakpoint
INSERT INTO `__new_Texts`("id", "title", "content", "has_special_chars", "language", "difficulty", "type") SELECT "id", "title", "content", "has_special_chars", "language", "difficulty", "type" FROM `Texts`;--> statement-breakpoint
DROP TABLE `Texts`;--> statement-breakpoint
ALTER TABLE `__new_Texts` RENAME TO `Texts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;