import ClientErrorLog from "../models/ClientErrorLog.js";
import { validationResult } from "express-validator";
import { sendError, sendSuccess } from "../utils/response.js";

export const logClientError = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 400, "Validation failed", errors.array());
    }

    const {
      message,
      stack,
      componentStack,
      source,
      path,
      method,
      statusCode,
      userAgent,
      userId
    } = req.body;

    if (!message || !String(message).trim()) {
      return sendError(res, 400, "Message is required");
    }

    const created = await ClientErrorLog.create({
      message: String(message).slice(0, 3000),
      stack: stack ? String(stack).slice(0, 12000) : undefined,
      componentStack: componentStack ? String(componentStack).slice(0, 12000) : undefined,
      source,
      path,
      method,
      statusCode,
      userAgent,
      userId
    });

    return sendSuccess(res, { id: created._id }, 201, "Client error logged");
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};
