import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { validationResult } from "express-validator";
import { sendError, sendSuccess } from "../utils/response.js";

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Register
export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 400, "Validation failed", errors.array());
    }

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendError(res, 400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return sendSuccess(res, {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    }, 201);
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 400, "Validation failed", errors.array());
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.isSuspended) {
        return sendError(res, 403, "Account suspended");
      }

      return sendSuccess(res, {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      return sendError(res, 401, "Invalid credentials");
    }
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};
