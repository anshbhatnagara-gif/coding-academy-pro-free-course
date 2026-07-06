# 🎓 CodeNest Free Academy — Implementation Plan

## Project Summary
Ek professional **free course website** banayenge jisme students register karke free courses enroll kar sakte hain, progress track kar sakte hain, aur 100% complete karne par certificate milega. Owner ke liye ek hidden private dashboard hoga.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite + TailwindCSS |
| Backend | Node.js + Express.js (ESM) |
| Database | MySQL 8.0 |
| Auth | JWT + bcrypt |
| Routing | React Router v6 |
| HTTP Client | Axios |

---

## Proposed Changes (Files to Create)

### Backend (`backend/`)

#### [NEW] `backend/package.json`
Express, mysql2, jsonwebtoken, bcryptjs, dotenv, cors, nodemon

#### [NEW] `backend/.env`
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=codenest_free_academy
JWT_SECRET=your_secret_key
OWNER_EMAIL=anshbhatnagara@gmail.com
```

#### [NEW] `backend/server.js`
Express server entry point, CORS, routes mounting

#### [NEW] `backend/config/db.js`
MySQL connection pool using `mysql2/promise`

#### [NEW] `backend/sql/schema.sql`
7 Tables:
- `users` (id, name, email, phone, password, role, xp, level, created_at, last_login_at, last_active_at)
- `courses` (id, title, description, category, difficulty, duration, thumbnail, instructor, created_at)
- `modules` (id, course_id, title, order_index, duration)
- `enrollments` (id, user_id, course_id, enrolled_at)
- `progress` (id, user_id, module_id, completed_at)
- `certificates` (id, user_id, course_id, certificate_id, issued_at)
- `activity_logs` (id, user_id, action, created_at)

#### [NEW] `backend/sql/seed.sql`
10 free courses + 3-5 modules each + owner account seeding

#### [NEW] `backend/middleware/authMiddleware.js`
JWT token verify karta hai — `req.user` mein user data set karta hai

#### [NEW] `backend/middleware/ownerMiddleware.js`
Sirf `OWNER_EMAIL` wale user ko allow karta hai — baaki sabko 403

#### [NEW] `backend/controllers/authController.js`
- `register` — bcrypt hash, MySQL insert, auto-role detect (owner email = owner)
- `login` — password match, JWT generate, last_login_at update
- `getProfile` — JWT se profile data

#### [NEW] `backend/controllers/courseController.js`
- `getCourses` — all courses with enrollment status
- `getCourseById` — course + modules + user progress
- `enrollCourse` — enrollment insert

#### [NEW] `backend/controllers/progressController.js`
- `getMyCourses` — enrolled courses with progress %
- `completeModule` — module complete mark karna, XP add, level calculate, certificate auto-issue
- `getCertificate` — certificate data fetch

#### [NEW] `backend/controllers/ownerController.js`
- `getDashboard` — total students, enrollments, certificates stats
- `getStudents` — all students with activity status (Regular/Less Active/Inactive)
- `getStudentById` — detailed student profile
- `getActivity` — recent activity logs
- `deleteStudent` — student delete

#### [NEW] Routes files (4 files)
`authRoutes.js`, `courseRoutes.js`, `progressRoutes.js`, `ownerRoutes.js`

---

### Frontend (`frontend/`)

#### [NEW] `frontend/package.json`
React, Vite, TailwindCSS, React Router, Axios, Lucide React

#### [NEW] `frontend/src/context/AuthContext.jsx`
Global auth state — user, token, login(), logout(), register()

#### [NEW] `frontend/src/components/Navbar.jsx`
- Logo: **CodeNest**
- Links: Home, Courses, Dashboard, My Learning
- Login/Register buttons (agar logged out)
- User avatar + logout (agar logged in)
- **Owner Dashboard link sirf owner ke liye visible**

#### [NEW] `frontend/src/components/CourseCard.jsx`
- Course thumbnail
- Category badge
- Title, instructor, duration
- **"Free Course" green badge**
- **"Start Learning"** button (enrolled users ke liye "Continue")
- Progress bar (agar enrolled)

#### [NEW] `frontend/src/components/ProtectedRoute.jsx`
JWT check — agar logged out toh `/login` par redirect

#### [NEW] `frontend/src/pages/Home.jsx`
- Hero section (gradient blue/purple)
- Stats (10+ courses, 100% free, certificates)
- Featured courses (first 6)
- CTA button

#### [NEW] `frontend/src/pages/Courses.jsx`
- All 10 free courses grid
- Category filter
- Search
- "Free Course" badge har card par

#### [NEW] `frontend/src/pages/CourseDetail.jsx`
- Course info (title, description, instructor)
- Modules list with checkmarks (completed)
- Enroll button / Continue Learning button
- Progress bar

#### [NEW] `frontend/src/pages/Login.jsx`
- Email + Password form
- JWT token localStorage mein save
- Owner email se login karne par owner dashboard redirect

#### [NEW] `frontend/src/pages/Register.jsx`
- Name, Email, Phone, Password form
- Auto-login after register

#### [NEW] `frontend/src/pages/Dashboard.jsx`
- Welcome banner
- Stats: enrolled courses, certificates, XP, level
- Recent activity
- Continue learning section

#### [NEW] `frontend/src/pages/MyLearning.jsx`
- Enrolled courses list
- Progress bars
- Resume/Start buttons

#### [NEW] `frontend/src/pages/Certificate.jsx`
- Beautiful certificate UI
- Student name
- Course title
- Certificate ID
- Issue date
- Print/Download option

#### [NEW] `frontend/src/pages/OwnerDashboard.jsx`
URL: `/owner-dashboard` (hidden, no nav link for students)

Features:
- Total students count
- Stats cards
- Students table:
  - Name, Email, Phone
  - Joined date, Last login, Last active
  - Regularity status (🟢 Regular / 🟡 Less Active / 🔴 Inactive)
  - Courses enrolled, Progress %
  - Certificates, XP, Level
- Delete student button
- Activity log

#### [NEW] `frontend/src/App.jsx`
React Router v6 routes + ProtectedRoute wrapping

#### [NEW] `frontend/src/main.jsx`
Vite entry point

---

## Regularity Logic

```
Regular     = last_active_at is TODAY
Less Active = last_active_at within last 7 days
Inactive    = last_active_at more than 7 days ago
```

---

## XP / Level System

```
Module complete = +50 XP
Course complete = +200 XP (bonus)
Level = Math.floor(XP / 500) + 1
```

---

## Design Style

- **Colors**: Blue (#3B82F6) + Purple (#8B5CF6) gradient
- **Font**: System font / Inter
- **Cards**: Rounded corners, shadow, hover effects
- **Badges**: Green "Free Course" badge
- **Progress bars**: Blue gradient
- **Responsive**: Mobile-first layout

---

## Database Setup Steps (After Build)

```bash
# MySQL mein login karke
mysql -u root -p

# Database create karo
CREATE DATABASE codenest_free_academy;
USE codenest_free_academy;

# Schema aur seed run karo
source backend/sql/schema.sql;
source backend/sql/seed.sql;
```

---

## Run Commands

```bash
# Backend
cd backend
npm install
npm run dev   # Port 5000

# Frontend
cd frontend
npm install
npm run dev   # Port 5173
```

---

## Open Questions

> [!IMPORTANT]
> **MySQL Password**: Aapka local MySQL password kya hai? `.env` mein set karna padega. Kya aapke paas MySQL installed hai?

> [!NOTE]
> **Owner Account**: Owner account seed data mein add kar denge with email `anshbhatnagara@gmail.com` and password `Admin@123` (aap baad mein change kar sakte ho).

---

## Verification Plan

### After Setup
1. `http://localhost:5000/api/health` → `{ status: "ok" }` aana chahiye
2. Student register → login → course enroll → module complete → certificate
3. Owner login at `/owner-dashboard` → student list visible

---

## File Count Summary
- Backend files: ~15 files
- Frontend files: ~17 files
- SQL files: 2 files
- **Total: ~34 files**

Aap **Proceed** click karein toh main saari files ek ek karke likhna shuru karta hoon! 🚀
