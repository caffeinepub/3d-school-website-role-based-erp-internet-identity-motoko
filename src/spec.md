# Specification

## Summary
**Goal:** Build a responsive public school website with a 3D home hero and 360° virtual tour, plus an Internet Identity-authenticated, role-based ERP backed by a single Motoko actor with persistent CRUD APIs.

**Planned changes:**
- Create public site pages (Home, About Us, Academics, Admissions, Faculty, Events, Gallery, Contact) with responsive navigation and a footer.
- Implement a Three.js (React Three Fiber) interactive 3D hero on Home with graceful fallback when WebGL/performance is limited.
- Add a Virtual Campus Tour experience using a 360° equirectangular panorama viewer with at least 3 switchable tour spots.
- Apply site-wide motion polish (smooth scrolling where appropriate, parallax accents, accessible micro-interactions) with reduced-motion support.
- Add dark/light mode toggle with persisted preference and consistent theming across public site and ERP.
- Create an authenticated ERP area (/erp) using Internet Identity login/logout and role-based access control for Admin, Principal/Management, Teacher, Student, Parent, Accountant, Librarian (backend-enforced), including admin role assignment.
- Backend (single Motoko main actor): define persistent data models and CRUD APIs for Users, Students, Staff/Teachers, Courses, Classes/Sections, Timetables, Attendance, Assessments/Grades, Fees (structures/invoices/payments), Announcements, Library (items/loans/fines), using stable storage across upgrades.
- ERP UI: implement a role-appropriate dashboard with widgets and loading/empty states using React Query.
- Implement ERP modules: Student Management (profiles, admissions status, history, search/filter + photo/document metadata), Attendance (marking + calendar-style views), Grades (entry, gradebook, printable report card), Faculty/Staff (profiles, leave requests, assignments), Academic Management (courses, classes/sections, timetables, exam schedules, assignment submissions metadata/links), Fee Management (structures, invoices, receipts, discounts, payment status with optional Stripe-guided flow), Communication (announcements targeting + read/unread + urgent), Library (catalog CRUD, search, issue/return, fine calculation).
- Add Reports & Analytics (attendance, performance, financial) with CSV export and print-friendly “Save as PDF” layouts.
- Add student ID card generation view (printable) composing student photo and key fields with RBAC restrictions.
- Ensure WCAG 2.1-aligned basics and performance optimizations for 3D assets (lazy loading, optimized geometry/textures).
- Add and reference generated static image assets from `frontend/public/assets/generated` for public pages, tour, gallery, and ID card background (no backend routing for images).

**User-visible outcome:** Visitors can browse a modern, responsive school website with a 3D home hero and a 360° campus tour; authorized users can sign into an ERP via Internet Identity to access role-appropriate dashboards and modules (students, attendance, grades, fees, announcements, library, reports), with printable exports and stable, persistent data.
