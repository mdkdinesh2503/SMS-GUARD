# SMS CLOUD — Student Management System

A full-stack **Student Management System** built with Angular 15. It provides a public website, an **Admin** portal for staff, and a **Student** portal for enrolled users. The app uses **json-server** as a REST API backend with session-based auth and route guards.

---

## Features

### Public (unauthenticated)
- **Front page** — Landing with steps to get started  
- **Home, About, Courses, Blogs, Services, Contact** — Informational pages  
- **Login** — Admin/Student login with session storage  
- **Register** — Student registration with confirm-password validation and deactivate guard  

### Admin (protected by `ActivateGuard`)
- **Dashboard** — Admin home  
- **Details** — Student details list and view (`admindetailsview/:id/:register`)  
- **Attendance** — Manage attendance  
- **Exam** — Exam hall allocation and exam timetable  
- **Fees** — Fee management  
- **Register list** — List and edit registrations (`adminregisteredit/:id/:name`)  
- **Reports** — Reports list and view (`adminreportview/:id`)  
- **Results** — Results list and view (`adminresultview/:id/:register`)  
- **Timetable** — Class timetables  
- **Review** — Student reviews list and view (`adminreviewopen/:id`)  

### Student (protected by `ActivateGuard`)
- **Dashboard, Profile** — Student home and profile  
- **Details** — Personal details  
- **Attendance** — View attendance  
- **Exam** — Exam info and payment (`studentexampayment/:registerNumber`)  
- **Fees** — Fees and payment (`studentfeespayment/:id/:register`)  
- **Reports** — View reports  
- **Results** — Results and result view (`studentresultview/:register`)  
- **Timetable** — Class timetable  
- **Review** — Submit/view reviews  

### Other
- **Search** — Global search  
- **Not upload** — Placeholder for “not yet uploaded” content  
- **404** — `PageErrorComponent` for unknown routes  

---

## Tech stack

| Category        | Technology                          |
|----------------|-------------------------------------|
| Frontend       | Angular 15 (standalone CLI project) |
| HTTP           | Angular `HttpClient`               |
| Forms          | Reactive Forms, custom validators   |
| Routing        | Router with route guards           |
| Backend (API)  | json-server (REST on `db.json`)    |
| Auth           | Session storage + `AuthService`    |
| Utilities      | RxJS, xlsx, ngx-order-pipe         |
| Tests          | Jasmine + Karma                     |

---

## Prerequisites

- **Node.js** (v14+ recommended for Angular 15)  
- **npm** or **yarn**  
- **Angular CLI 15**: `npm install -g @angular/cli@15`  

---

## Installation

1. **Clone and install dependencies**

   ```bash
   git clone <repository-url>
   cd SMS-GUARD
   npm install
   ```

2. **Backend (json-server)**  
   The app expects a REST API at **`http://localhost:3000`** using `db.json`.

   Start the API in a separate terminal:

   ```bash
   npx json-server --watch db.json --port 3000
   ```

   Or add a script in `package.json` and run it:

   ```json
   "server": "json-server --watch db.json --port 3000"
   ```

   Then: `npm run server`

3. **Run the Angular app**

   ```bash
   npm start
   # or: ng serve
   ```

   Open **http://localhost:4200**. The app redirects to `/frontpage` by default.

---

## Project structure (high level)

```
SMS-GUARD/
├── db.json                 # json-server database (Registers, AdminList, etc.)
├── src/
│   ├── app/
│   │   ├── app-routing.module.ts   # All routes and guards
│   │   ├── app.module.ts
│   │   ├── auth.service.ts        # Session auth, login state, export to xlsx
│   │   ├── user.service.ts        # POST/DELETE to API
│   │   ├── Update.service.ts      # PUT to API
│   │   ├── login.service.ts       # GET from API (Registers, AdminList, etc.)
│   │   ├── activate.guard.ts      # Protects admin/student routes
│   │   ├── deactivate.guard.ts    # Protects register (unsaved changes)
│   │   ├── confirmpassword.validator.ts
│   │   ├── navbar, footer, frontpage, home, about, blogs, contact, courses, services
│   │   ├── login, register
│   │   ├── AdminDashboard, AdminNavbar, AdminDetails, AdminAttendance, AdminExam,
│   │   │   AdminFees, AdminRegisterList, AdminReports, AdminResults, AdminTimetable,
│   │   │   AdminReview, Admin*View, AdminRegisterEdit
│   │   ├── StudentDashboard, StudentNavbar, StudentDetails, StudentAttendance,
│   │   │   StudentExam, StudentFees, StudentReports, StudentResults, StudentTimetable,
│   │   │   StudentProfile, StudentReview, Student*View, StudentFeesPayment, StudentExamPayment
│   │   ├── Search, ErrorDisplay, PageError, Notuploaded
│   │   └── ...
│   ├── assets/
│   ├── index.html
│   └── styles.css
├── angular.json
├── package.json
└── README.md
```

---

## API (json-server)

Endpoints used by the app (from `db.json` and services):

| Resource                    | Usage                          |
|----------------------------|--------------------------------|
| `Registers`                | Student registration, CRUD     |
| `loginlist`                | Login validation               |
| `AdminList`                | Admin users                    |
| `StudentDetails`           | Student details                |
| `StudentAttendance`        | Attendance                     |
| `StudentReports`           | Reports                        |
| `AdminTimetable`           | Timetables                     |
| `AdminResult`              | Results                        |
| `AdminReports`             | Admin reports                  |
| `AdminExamHallAllocation`  | Exam halls                     |
| `AdminExamTimetable`       | Exam schedule                  |
| `StudentExamFeesPayment`   | Exam fee payments              |
| `StudentCollegeFeesPayment`| College fee payments           |
| `StudentReview`            | Student reviews                |
| `Quotes`                   | Quotes (e.g. front page)       |
| `NewsLetter`               | Newsletter                     |

Base URL: **http://localhost:3000**. Ensure json-server is running before using login or any data features.

---

## Scripts

| Command        | Description                          |
|----------------|--------------------------------------|
| `npm start`    | Dev server at http://localhost:4200  |
| `npm run build`| Production build → `dist/sms`        |
| `npm run test` | Unit tests (Karma + Jasmine)         |

---

## Build

```bash
ng build
# or
npm run build
```

Output is in **`dist/sms`**. For production deployment, configure your server so the API base URL (e.g. `http://localhost:3000`) matches your backend or set up environment-based URLs.

---

## Testing

```bash
ng test
# or
npm test
```

Runs unit tests with Karma and Jasmine.

---

## Route guards

- **ActivateGuard** — Used on all admin and student routes. Redirects to `/login` if the user is not considered logged in (via `AuthService.isUserLogin()` / `isAdminLogin()`).
- **DeactivateGuard** — Used on `/register`; implements `canExit()` to avoid losing form data when leaving the page.

---

## License

Private / academic project. Adjust as needed for your institution.
