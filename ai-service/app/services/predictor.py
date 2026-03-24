from app.utils.preprocess import clean_text

# Simple keyword-based detection (MVP)
SCAM_KEYWORDS = [
    "win money",
    "free prize",
    "click link",
    "urgent",
    "bank otp",
    "lottery",
    "claim now"
]

def predict_scam(text):
    text = clean_text(text)

    for keyword in SCAM_KEYWORDS:
        if keyword in text:
            return {
                "label": "MALICIOUS",
                "confidence": 0.9
            }

    return {
        "label": "SAFE",
        "confidence": 0.7
    }
