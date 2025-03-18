CREATE TABLE `Users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`role` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Users_email_unique` ON `Users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `Users_username_unique` ON `Users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `Users_password_unique` ON `Users` (`password`);