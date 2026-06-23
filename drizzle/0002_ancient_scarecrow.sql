ALTER TABLE "products" DROP CONSTRAINT "products_id_unique";--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "id" SET DATA TYPE bigserial;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "updated_at" SET NOT NULL;