import Report from "../models/Report.js";

// Create Report
export const createReport = async (req, res) => {
  try {
    const { title, description, category, evidence } = req.body;

    const report = await Report.create({
      user: req.user._id,
      title,
      description,
      category,
      evidence
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Reports (User -> own, Admin -> all)
export const getReports = async (req, res) => {
  try {
    let reports;

    if (req.user.role === "ADMIN") {
      reports = await Report.find().populate("user", "name email");
    } else {
      reports = await Report.find({ user: req.user._id });
    }

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Status (Admin only)
export const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.status = status;
    await report.save();

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
