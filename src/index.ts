//imports
import "dotenv/config";
import express, { type Request, type Response } from "express";
import { drizzle } from "drizzle-orm/neon-http";
import { and, or, eq, lt, desc } from "drizzle-orm";
import { productsTable } from "./db/schema.js";
//env variables
const port = process.env.PORT;
const db = drizzle(process.env.DATABASE_URL!);
const app = express();

app.get("/products", async (req: Request, res: Response) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const category = (req.query.category as any) || undefined;
    const cursorId = Number(req.query.cursorId as any) || undefined;
    const rawCursor = req.query.cursorUpdatedAt as string | undefined;
    const cursorUpdatedAt = rawCursor ? new Date(rawCursor) : null;
    // console.log(cursorUpdatedAt);
    // console.log(req.query.cursorUpdatedAt);
    const filters = [];

    if (category) {
      filters.push(eq(productsTable.category, category));
    }

    // get items before cursor and check if cursor is provided other wise it'll show error
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
      .limit(limit + 1);

    const hasMore = products.length > limit;
    const paginated_products = hasMore ? products.slice(0, limit) : products;
    ///@ts-ignore
    const nextCursor = products?.length > 0 && {
      cursorId: products[products.length - 1]?.id || undefined,
      cursorUpdatedAt: products[products.length - 1]?.updatedAt || undefined,
    };

    res.json({
      products: paginated_products,
      nextCursor: nextCursor,
      size: paginated_products.length,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
