import express from "express";
import { detectScam } from "../controllers/aiController.js";

const router = express.Router();

router.post("/predict", detectScam);

export default router;
