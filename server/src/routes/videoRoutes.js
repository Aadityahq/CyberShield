import express from "express";
import { body } from "express-validator";
import {
  createVideo,
  getPendingVideos,
  getVideos,
  updateVideoStatus
} from "../controllers/videoController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  [
    body("title").trim().escape().notEmpty().withMessage("Title required"),
    body("url").trim().isURL().withMessage("Valid URL required"),
    body("category").isIn(["AWARENESS", "SCAM", "TIPS"]).withMessage("Invalid category")
  ],
  createVideo
);
router.get("/", getVideos);

router.get("/pending", protect, adminOnly, getPendingVideos);
router.put(
  "/:id",
  protect,
  adminOnly,
  [body("status").isIn(["APPROVED", "REJECTED"]).withMessage("Invalid status")],
  updateVideoStatus
);

export default router;
