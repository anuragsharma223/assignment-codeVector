//imports
import "dotenv/config";
import express from "express";

//env variables
const port = process.env.PORT;

const app = express();

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
