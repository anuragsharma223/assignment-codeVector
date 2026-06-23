// Imports

//Below statement is used to remove error for types: node
/// <reference types="node" />
import "dotenv/config";
import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/neon-http";

//Named Imports
import { productsTable } from "./src/db/schema";
const db = drizzle(process.env.DATABASE_URL!);

//Functions
