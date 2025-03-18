CREATE TABLE `Texts` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`has_special_chars` integer NOT NULL,
	`language` integer,
	`difficulty` integer,
	`type` integer
);
