import Notification from "../models/Notification.js";
import { sendError, sendSuccess } from "../utils/response.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    return sendSuccess(res, notifications);
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return sendError(res, 404, "Notification not found");
    }

    notification.isRead = true;
    await notification.save();

    return sendSuccess(res, notification);
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};
