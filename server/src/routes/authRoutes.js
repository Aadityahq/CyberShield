import express from "express";
import { body, validationResult } from "express-validator";
import {
  registerUser,
  loginUser,
  verifyOTP,
  resendOTP,
  forgotPassword,
  resetPassword
} from "../controllers/authController.js";

const router = express.Router();

const emailChain = () => body("email")
  .isEmail()
  .withMessage("Valid email required")
  .customSanitizer((value) => String(value).trim().toLowerCase());

router.post(
  "/register",
  [
    body("name").trim().escape().notEmpty().withMessage("Name is required"),
    emailChain(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
  ],
  registerUser
);

router.post(
  "/login",
  [
    emailChain(),
    body("password").notEmpty().withMessage("Password required")
  ],
  loginUser
);

router.post(
  "/verify-otp",
  [
    emailChain(),
    body("otp")
      .trim()
      .isLength({ min: 6, max: 6 })
      .isNumeric()
      .withMessage("Valid 6-digit OTP required")
  ],
  verifyOTP
);

router.post(
  "/resend-otp",
  [
    emailChain()
  ],
  resendOTP
);

router.post(
  "/forgot-password",
  [emailChain()],
  forgotPassword
);

router.post(
  "/reset-password",
  [
    emailChain(),
    body("token")
      .trim()
      .notEmpty()
      .withMessage("Reset token required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters")
  ],
  resetPassword
);

export default router;
