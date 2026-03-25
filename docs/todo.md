# TODO - CyberShield

## 🔴 High Priority

### Phase 1: Setup
- [x] Setup project structure
- [x] Initialize React app with Vite
- [x] Initialize Express server
- [x] Connect frontend with backend

---

### Phase 2: Authentication
- [x] User registration API
- [x] Login API
- [x] JWT authentication
- [x] Protected routes

---

### Phase 3: Incident Reporting
- [x] Create report model
- [x] Submit report API
- [x] Fetch reports API
- [ ] Upload evidence (optional)

---

### Phase 4: AI Integration
- [x] Create Python API
- [x] Implement scam classifier
- [x] Connect backend to AI API

---

### Phase 5: Knowledge Hub
- [x] Create article model
- [x] Add article API (admin)
- [x] Fetch articles API

---

### Phase 6: Admin Dashboard
- [x] View reports
- [x] Update report status
- [x] Manage users

---

### Phase 7: Deployment
- [ ] Deploy frontend
- [ ] Deploy backend
- [ ] Deploy AI service

---

## 🟡 Medium Priority
- [x] UI improvements (basic functional layout)
- [x] UI polishing pass (design system, cards, status indicators, clean navbars)
- [x] Premium UX pass (icons, toast notifications, loading states)
- [x] Add frontend + backend auth input validation (email format, required fields, password length)
- [x] Application Security (AppSec) implementation:
  - [x] Global security middleware (helmet, xss-clean, mongo-sanitize)
  - [x] Request validation/sanitization on auth endpoints (express-validator)
  - [x] Request validation/sanitization on report endpoints (express-validator)
  - [x] Frontend input sanitization utility (XSS prevention light layer)
  - [x] NoSQL injection prevention (express-mongo-sanitize middleware)
- [ ] Mobile responsiveness
- [x] Add AI Detector frontend page (`/ai`)
- [x] Add Knowledge Hub list/detail frontend routes (`/articles`, `/articles/:id`)
- [x] Split admin frontend into pages (ManageReports, ManageUsers, ManageArticles)

---

## 🟢 Low Priority
- [ ] Forum (optional)
- [ ] RBAC enhancements (role seeding, granular permissions, audit logging)