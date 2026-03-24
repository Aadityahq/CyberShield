# Development Logs

## Day 1
- Initialized project structure
- Created frontend and backend

## Day 2
- Implemented authentication APIs

## Day 3
- Built report submission feature

## Day 4
- Setup top-level MVP project structure folders (`client`, `server`, `ai-service`, `docs`)

## Day 5
- Added Report module (schema, controller, routes)
- Added auth and role middlewares for protected/admin report access
- Connected `/api/reports` route in backend app

## Day 6
- Setup FastAPI AI service with `/api/predict` endpoint
- Implemented MVP scam detector (keyword-based classifier)
- Integrated backend AI service via axios and added `/api/ai/predict` route

## Day 7
- Updated docs to reflect AI service setup, backend AI integration, and current run endpoints

## Day 8
- Implemented Knowledge Hub backend module (Article model, controller, routes)
- Added public article read APIs and admin-only article creation API
- Connected `/api/articles` route in backend app

## Day 9
- Implemented Admin Dashboard backend module (controller with 5 privileged APIs)
- Built dashboard stats endpoint (total users, reports, articles, pending reports)
- Added user management APIs (list all users, delete user)
- Enhanced report management with admin-only view of all reports with user details
- Added article deletion API for admin cleanup
- Connected `/api/admin` route with protect + adminOnly middleware protection

---

## Notes
- Always log what was done
- Keep entries short and clear