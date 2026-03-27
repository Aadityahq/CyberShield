import Report from "../models/Report.js";
import { validationResult } from "express-validator";
import Notification from "../models/Notification.js";
import { encrypt, decrypt } from "../utils/encryption.js";

// Create Report
export const createReport = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      category,
      severity,
      contactEmail,
      isAnonymous,
      isSensitive
    } = req.body;
    const evidencePath = req.file ? `/uploads/${req.file.filename}` : null;
    const anonymousFlag = isAnonymous === true || isAnonymous === "true";
    const sensitiveFlag = isSensitive === true || isSensitive === "true";
    const safeDescription = sensitiveFlag ? encrypt(description) : description;

    const report = await Report.create({
      user: anonymousFlag ? null : req.user._id,
      title,
      description: safeDescription,
      category,
      severity: severity || "LOW",
      contactEmail,
      evidence: evidencePath,
      isAnonymous: anonymousFlag,
      isSensitive: sensitiveFlag,
      history: [{ status: "PENDING" }]
    });

    if (report.isAnonymous) {
      report.user = null;
    }

    await Notification.create({
      message: "New report submitted",
      type: "REPORT"
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Reports (User -> own, Admin -> all)
export const getReports = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const reports = await Report.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const safeReports = reports.map((report) => {
      const item = report.toObject();
      if (item.isSensitive) {
        item.description = decrypt(item.description);
      }
      return item;
    });

    res.json(safeReports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Status (Admin only)
export const updateReportStatus = async (req, res) => {
  try {
    const { status: newStatus } = req.body;

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.status = newStatus;
    report.history.push({
      status: newStatus,
      date: new Date()
    });
    await report.save();

    await Notification.create({
      message: `Report marked as ${newStatus}`,
      type: "REPORT"
    });

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
