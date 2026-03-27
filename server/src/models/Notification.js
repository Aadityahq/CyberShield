import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    message: String,
    type: String,
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
