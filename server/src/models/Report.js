import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ["PHISHING", "SCAM", "HARASSMENT", "OTHER"],
      default: "OTHER"
    },
    evidence: {
      type: String
    },
    severity: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "LOW"
    },
    contactEmail: {
      type: String
    },
    status: {
      type: String,
      enum: ["PENDING", "REVIEWED", "RESOLVED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
