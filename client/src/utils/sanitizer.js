/**
 * Frontend input cleaning utility (light protection layer)
 * Removes HTML/script tags to prevent basic XSS on client side
 * Note: Backend validation + sanitization is the primary security layer
 */

export const cleanInput = (text) => {
  if (!text || typeof text !== "string") return "";
  // Remove HTML tags and script injections
  return text.replace(/<[^>]*>?/gm, "").trim();
};

export const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== "object") return obj;

  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = cleanInput(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};
