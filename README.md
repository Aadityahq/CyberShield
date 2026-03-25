# CyberShield

Project documentation has moved to [docs/README.md](docs/README.md).

Start here:

- [Project Context](docs/context.md)
- [TODO](docs/todo.md)
- [Variables](docs/variables.md)
- [Logs](docs/logs.md)
- [Bugs](docs/bugs.md)

## Validation Rules (Current)

Frontend (Login/Register):

- Email must match a basic email format check
- Password must be at least 6 characters

Backend (Auth APIs):

- Required field validation on register/login
- Email format validation on register/login
- Password must be at least 6 characters on register
- Input sanitization and HTML escaping on all auth fields
- Report title, description, and category validation with sanitization
- Report severity and contactEmail optional validation

AI Predictor:

- Keyword scoring classifier with labels SAFE, SUSPICIOUS, MALICIOUS
- Thresholds: 0-1 matches = SAFE, 2 = SUSPICIOUS, 3+ = MALICIOUS

## Security Implementation (AppSec)

Backend:
- Global middleware: helmet (secure headers), xss-clean (XSS prevention), express-mongo-sanitize (NoSQL injection prevention)
- Route-level request validation/sanitization using express-validator on auth and report endpoints
- Input trimming, HTML escaping, email validation, and category whitelisting

Frontend:
- Utility sanitizer module for light-layer XSS prevention (HTML tag removal)
- Auth and report forms sanitize user input before API calls

## File Upload System

Backend:
- Multer storage configured for disk storage in /uploads directory
- File type filtering: JPEG, PNG, GIF, PDF
- Static file serving via Express on /uploads endpoint
- Report evidence stored as file path in database

Frontend:
- CreateReport form includes optional file input
- FormData used for multipart/form-data submissions
- Evidence preview in ViewReports (images inline, PDFs as links)

## User-Generated Content & Moderation

Backend:
- Articles can be submitted by any authenticated user
- User submissions created with status: PENDING
- Admin endpoints for viewing pending articles and approving/rejecting
- Public API only returns APPROVED articles

Frontend:
- Articles page includes submission form toggle
- Knowledge Hub shows only approved published articles
- Admin ManageArticles page with Pending vs Published tabs
- Approve/Reject buttons for pending content with creator contact info
