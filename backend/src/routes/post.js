import express from "express";
import protect from "../middlewares/protect.js";
import { createPost } from "../controllers/post.js";
const router = express.Router();

router.post("/create", protect, createPost);

export default router;
