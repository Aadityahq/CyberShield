import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";
import { getNotifications, markNotificationRead } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", protect, adminOnly, getNotifications);
router.put("/:id/read", protect, adminOnly, markNotificationRead);

export default router;
