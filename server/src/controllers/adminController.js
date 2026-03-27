import User from "../models/User.js";
import Report from "../models/Report.js";
import Article from "../models/Article.js";
import { decrypt } from "../utils/encryption.js";

// Dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalReports = await Report.countDocuments();
    const totalArticles = await Article.countDocuments();

    const pendingReports = await Report.countDocuments({
      status: "PENDING"
    });

    res.json({
      totalUsers,
      totalReports,
      totalArticles,
      pendingReports
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reports (admin view with user details)
export const getAllReportsAdmin = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const reports = await Report.find()
      .populate("user", "name email")
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

// Delete article
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    await article.deleteOne();

    res.json({ message: "Article deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Promote user to admin (Admin or Super Admin)
export const promoteToAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "SUPER_ADMIN") {
      return res.status(400).json({ message: "Cannot modify Super Admin role" });
    }

    user.role = "ADMIN";
    await user.save();

    res.json({ message: "User promoted to admin" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Suspend user (Admin or Super Admin)
export const suspendUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "SUPER_ADMIN") {
      return res.status(400).json({ message: "Cannot suspend Super Admin" });
    }

    user.isSuspended = true;
    await user.save();

    res.json({ message: "User suspended" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove admin role (Super Admin only)
export const removeAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "ADMIN") {
      return res.status(400).json({ message: "Not an admin" });
    }

    user.role = "USER";
    await user.save();

    res.json({ message: "Admin removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
