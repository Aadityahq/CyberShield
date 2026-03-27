import express from "express";
import { createPost, addReply, getAllPosts } from "../controllers/forumController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPost);
router.post("/:id/reply", protect, addReply);
router.get("/", getAllPosts);

export default router;
