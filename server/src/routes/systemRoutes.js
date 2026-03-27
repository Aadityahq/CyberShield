import express from "express";
import { body } from "express-validator";
import { logClientError } from "../controllers/systemController.js";

const router = express.Router();

router.post(
  "/client-errors",
  [
    body("message").trim().isLength({ min: 1, max: 3000 }).withMessage("Message is required"),
    body("source").optional().isIn(["UI", "API"]).withMessage("Invalid source"),
    body("statusCode").optional().isInt({ min: 100, max: 599 }).withMessage("Invalid status code")
  ],
  logClientError
);

export default router;
