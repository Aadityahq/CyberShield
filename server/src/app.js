import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);

// Health check
app.get("/", (req, res) => {
	res.send("API is running...");
});

export default app;
