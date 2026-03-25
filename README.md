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
