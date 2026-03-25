import express from "express";
import { body } from "express-validator";
import {
  createReport,
  getReports,
  updateReportStatus
} from "../controllers/reportController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  [
    body("title").trim().escape().notEmpty().withMessage("Title required"),
    body("description").trim().escape().notEmpty().withMessage("Description required"),
    body("category").isIn(["PHISHING", "SCAM", "HARASSMENT", "OTHER"]).withMessage("Invalid category")
  ],
  createReport
);
router.get("/", protect, getReports);
router.put("/:id", protect, adminOnly, updateReportStatus);

export default router;
