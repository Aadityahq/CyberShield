import express from "express";
import { detectScam } from "../controllers/aiController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/predict", protect, detectScam);

export default router;
