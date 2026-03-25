import express from "express";
import { body, validationResult } from "express-validator";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().escape().notEmpty().withMessage("Name is required"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required")
  ],
  loginUser
);

export default router;
