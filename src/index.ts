//imports
import "dotenv/config";
import express, { type Request, type Response } from "express";
import { drizzle } from "drizzle-orm/neon-http";

//env variables
const port = process.env.PORT;
const db = drizzle(process.env.DATABASE_URL!);
const app = express();

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
