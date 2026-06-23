//imports
import "dotenv/config";
import express, { type Request, type Response } from "express";
import { drizzle } from "drizzle-orm/neon-http";
import { and, or, eq, lt, desc, type SQLWrapper } from "drizzle-orm";
import { productsTable } from "./db/schema.ts";
//env variables
const port = process.env.PORT;
const db = drizzle(process.env.DATABASE_URL!);
const app = express();

app.get("/products", async (req: Request, res: Response) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);

    const category = (req.query.category as any) || undefined;

    const cursorId = (req.query.cursorId as any) || undefined;

    const cursorUpdatedAt = (req.query.cursorUpdatedAt as any) || new Date();

    const filters = [];

    if (category) {
      filters.push(eq(productsTable.category, category));
    }
    // get items before cursor
    if (cursorUpdatedAt && cursorId) {
      filters.push(
        or(
          lt(productsTable.updatedAt, cursorUpdatedAt),
          and(
            eq(productsTable.updatedAt, cursorUpdatedAt),
            lt(productsTable.id, cursorId),
          ),
        ),
      );
    }

    const products = await db
      .select()
      .from(productsTable)
      .where(filters.length > 0 ? and(...filters) : undefined)
      .orderBy(desc(productsTable.updatedAt), desc(productsTable.id))
      .limit(limit);
    const nextCursor =
      products.length > 0
        ? {
            cursorId: products[products.length - 1].id || undefined,
            cursorUpdatedAt:
              products[products.length - 1].updatedAt || undefined,
          }
        : undefined;

    res.json({
      products,
      nextCursor: nextCursor,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
  }
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
