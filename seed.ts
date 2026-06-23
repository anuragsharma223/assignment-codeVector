//Below statement is used to remove error for types: node
/// <reference types="node" />

// Imports
import "dotenv/config";
import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/neon-http";
import pLimit from "p-limit";

//Named Imports
import { productsTable } from "./src/db/schema";

//Constants
const db = drizzle(process.env.DATABASE_URL!);
const TotalRecords = 200000;
const BatchSize = 5000; // Limit the number of concurrent insert operations
const promises: Promise<any>[] = [];
const limit = pLimit(5); // Limit the number of concurrent insert operations

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
  for (let i = 0; i < TotalRecords; i += BatchSize) {
    const products = Array.from({ length: BatchSize }, createRandomProduct);

    // this is used to concurrently run the promises the promises are the batch db enteries
    // here. After 5 entries the next back will be executed if one promise is resolved the
    // other one will be executed.
    promises.push(
      limit(async () => await db.insert(productsTable).values(products)),
    );
  }
  await Promise.all(promises);
}

seed()
  .then(() => {
    console.log("Seeding completed successfully!");
  })
  .catch((e) => {
    console.error("Seeding error: ", e);
  });
