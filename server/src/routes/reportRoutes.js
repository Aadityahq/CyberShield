import express from "express";
import {
  createReport,
  getReports,
  updateReportStatus
} from "../controllers/reportController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, createReport);
router.get("/", protect, getReports);
router.put("/:id", protect, adminOnly, updateReportStatus);

export default router;
