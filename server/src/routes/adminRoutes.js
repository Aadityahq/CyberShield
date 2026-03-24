import express from "express";
import {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllReportsAdmin,
  deleteArticle
} from "../controllers/adminController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Dashboard
router.get("/stats", protect, adminOnly, getDashboardStats);

// Users
router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);

// Reports
router.get("/reports", protect, adminOnly, getAllReportsAdmin);

// Articles
router.delete("/articles/:id", protect, adminOnly, deleteArticle);

export default router;
