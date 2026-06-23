ALTER TABLE "users" RENAME TO "products";--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "users_id_unique";--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_id_unique" UNIQUE("id");