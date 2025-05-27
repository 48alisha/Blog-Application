import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config({
  path: process.cwd() + "/.env",
});

const app = express();
const port = process.env.PORT || 5000;

// Middlewares:
app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`Server is started on PORT::${port}`);
});
