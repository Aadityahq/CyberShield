import mongoose from "mongoose";

const clientErrorLogSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },
    stack: {
      type: String
    },
    componentStack: {
      type: String
    },
    source: {
      type: String,
      enum: ["UI", "API"],
      default: "UI"
    },
    path: {
      type: String
    },
    method: {
      type: String
    },
    statusCode: {
      type: Number
    },
    userAgent: {
      type: String
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const ClientErrorLog = mongoose.model("ClientErrorLog", clientErrorLogSchema);

export default ClientErrorLog;
