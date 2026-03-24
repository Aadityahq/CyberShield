import { analyzeText } from "../services/aiService.js";

export const detectScam = async (req, res) => {
  try {
    const { text } = req.body;

    const result = await analyzeText(text);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
