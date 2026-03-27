import { analyzeText } from "../services/aiService.js";
import { sendError, sendSuccess } from "../utils/response.js";

export const detectScam = async (req, res) => {
  try {
    const { text } = req.body;

    const result = await analyzeText(text);

    return sendSuccess(res, result);
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};
