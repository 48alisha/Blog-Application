import express from "express";
import protect from "../middlewares/protect.js";
import { createPost, listAllPost } from "../controllers/post.js";
const router = express.Router();

router.post("/create", protect, createPost);
router.get("/list/all", protect, listAllPost)

export default router;
