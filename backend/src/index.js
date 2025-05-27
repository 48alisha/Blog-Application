import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import MongoConnection from "./config/db.js";

dotenv.config({
  path: process.cwd() + "/.env",
});

const app = express();
const port = process.env.PORT || 5000;

// Connect with MongoDB:
MongoConnection();

// Middlewares:
app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`Server is started on PORT::${port}`);
});
