import express from "express";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Security Middleware
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// Standard Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/notifications", notificationRoutes);

// Health check
app.get("/", (req, res) => {
	res.send("API is running...");
});

export default app;
