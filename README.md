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

AI Predictor:

- Keyword scoring classifier with labels SAFE, SUSPICIOUS, MALICIOUS
- Thresholds: 0-1 matches = SAFE, 2 = SUSPICIOUS, 3+ = MALICIOUS
