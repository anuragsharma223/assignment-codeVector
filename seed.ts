// Imports

//Below statement is used to remove error for types: node
/// <reference types="node" />
import "dotenv/config";
import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/neon-http";

//Named Imports
import { productsTable } from "./src/db/schema";
const db = drizzle(process.env.DATABASE_URL!);

//Constants
const TotalRecords = 200000;
const BatchSize = 5000; // Limit the number of concurrent insert operations

//Functions
// console.log(faker.person.fullName());
// console.log(faker.commerce.productName());
// console.log(faker.number.int({ min: 1, max: 10000}));

function createRandomProduct() {
  return {
    name: faker.commerce.productName(),
    category: faker.commerce.department(),
    price: faker.number.int({ min: 1, max: 10000 }),
  };
}

async function seed() {
  for (let i = 0; i <= TotalRecords; i += BatchSize) {
    const products = Array.from({ length: BatchSize }, createRandomProduct);
    await db.insert(productsTable).values(products);
  }
}

seed()
  .then(() => {
    console.log("Seeding completed successfully!");
  })
  .catch((e) => {
    console.error("Seeding error: ", e);
  });
