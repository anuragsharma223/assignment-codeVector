// Imports
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";

// env variables
const db = drizzle(process.env.DATABASE_URL!);

// Named Imports
import { productsTable } from "./db/schema.ts";
