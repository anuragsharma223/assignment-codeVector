import {
  integer,
  text,
  pgTable,
  timestamp,
  index,
  bigserial,
} from "drizzle-orm/pg-core";

export const productsTable = pgTable(
  "products",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    price: integer("price").notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  // Creating an index on updated_id and id
  (table) => [
    index("products_id_updated_at_idx").on(table.updatedAt, table.id),
  ],
);

// npx drizzle-kit generate
//npx drizzle-kit migrate
