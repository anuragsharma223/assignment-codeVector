import {
  integer,
  text,
  pgTable,
  timestamp,
  bigserial,
} from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: integer("price").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});
