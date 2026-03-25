# Variables & Constants

## Backend

### Environment Variables

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=supersecretkey
AI_SERVICE_URL=http://localhost:8000

---

## API Routes

### Auth

POST /api/auth/register
POST /api/auth/login

### Reports

POST /api/reports
GET /api/reports
PUT /api/reports/:id

### AI

POST /api/ai/predict

### Articles

POST /api/articles
GET /api/articles
GET /api/articles/:id

### Admin

GET /api/admin/stats
GET /api/admin/users
DELETE /api/admin/users/:id
GET /api/admin/reports
DELETE /api/admin/articles/:id

---

## Frontend Routes

/
/register
/dashboard
/create-report
/reports
/ai
/articles
/articles/:id
/admin
/admin/reports
/admin/users
/admin/articles

---

## Frontend UI Libraries

lucide-react
react-hot-toast

---

## Roles

USER
ADMIN

---

## Report Status

PENDING
REVIEWED
RESOLVED

---

## AI Output Labels

SAFE
SUSPICIOUS
MALICIOUS

---

## AI Predictor Rules (Current)

SCAM_KEYWORDS includes:
win, lottery, prize, claim, urgent, click, verify, otp, bank, free, offer, link, account, suspended

Classification thresholds:
- score >= 3 => MALICIOUS (confidence 0.9)
- score == 2 => SUSPICIOUS (confidence 0.6)
- score <= 1 => SAFE (confidence 0.8)

---

## Auth Validation Rules (Current)

Frontend (Login/Register):
- email must match basic email regex
- password length must be at least 6

Backend (register/login endpoints):
- required fields must be present
- email must match basic email regex
- password length must be at least 6 (register)

---

## Backend Security Middleware (Current)

Global middleware stack (app.js):
- helmet(): Secure HTTP headers (disable XSS reflection, content sniffing, etc.)
- xss-clean(): Remove malicious script injection attempts
- express-mongo-sanitize(): Remove $ and . from req.body to prevent NoSQL injection queries like { "$gt": "" }
- cors(): Cross-origin resource sharing
- express.json(): Parse JSON bodies

Route-level middleware (auth/report endpoints):
- body().trim().escape(): Remove leading/trailing spaces, escape HTML
- body().isEmail().normalizeEmail(): Validate email format and normalize
- body().isLength({ min: 6 }): Enforce minimum length
- body().isIn([...]): Whitelist valid category values
- validationResult(): Check for validation errors before processing

---

## Frontend Security Utilities (Current)

sanitizer.js functions:
- cleanInput(text): Remove HTML tags and script injection attempts
- sanitizeObject(obj): Clean all string values in an object before API send

Usage in forms:
- Login/Register/CreateReport pages sanitize form data before API.post()