import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import MongoConnection from "./config/db.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";

dotenv.config({
  path: process.cwd() + "/.env",
});

const app = express();
const port = process.env.PORT || 5000;

// Connect with MongoDB:
MongoConnection();

// Middlewares:
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes:
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", postRoutes);

app.listen(port, () => {
  console.log(`Server is started on PORT::${port}`);
});
