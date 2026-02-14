import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { ThemeProvider } from './components/theme/ThemeProvider';
import PublicLayout from './components/layout/PublicLayout';
import ErpLayout from './components/layout/ErpLayout';
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import AcademicsPage from './pages/public/AcademicsPage';
import AdmissionsPage from './pages/public/AdmissionsPage';
import FacultyPage from './pages/public/FacultyPage';
import EventsPage from './pages/public/EventsPage';
import GalleryPage from './pages/public/GalleryPage';
import ContactPage from './pages/public/ContactPage';
import CampusTourPage from './pages/public/CampusTourPage';
import ErpLoginPage from './pages/erp/ErpLoginPage';
import DashboardPage from './pages/erp/DashboardPage';
import StudentsListPage from './pages/erp/students/StudentsListPage';
import StudentDetailPage from './pages/erp/students/StudentDetailPage';
import StudentCreatePage from './pages/erp/students/StudentCreatePage';
import StudentIdCardPage from './pages/erp/students/StudentIdCardPage';
import AttendanceOverviewPage from './pages/erp/attendance/AttendanceOverviewPage';
import MarkAttendancePage from './pages/erp/attendance/MarkAttendancePage';
import GradebookPage from './pages/erp/grades/GradebookPage';
import ReportCardPrintPage from './pages/erp/grades/ReportCardPrintPage';
import StaffListPage from './pages/erp/staff/StaffListPage';
import StaffDetailPage from './pages/erp/staff/StaffDetailPage';
import LeaveRequestsPage from './pages/erp/staff/LeaveRequestsPage';
import MyTimetablePage from './pages/erp/timetable/MyTimetablePage';
import ClassSectionsPage from './pages/erp/academics/ClassSectionsPage';
import TimetableEditorPage from './pages/erp/academics/TimetableEditorPage';
import ExamSchedulePage from './pages/erp/academics/ExamSchedulePage';
import AssignmentsPage from './pages/erp/academics/AssignmentsPage';
import FeesOverviewPage from './pages/erp/fees/FeesOverviewPage';
import ReceiptPrintPage from './pages/erp/fees/ReceiptPrintPage';
import PaymentSuccessPage from './pages/payments/PaymentSuccessPage';
import PaymentFailurePage from './pages/payments/PaymentFailurePage';
import AnnouncementsPage from './pages/erp/announcements/AnnouncementsPage';
import LibraryCatalogPage from './pages/erp/library/LibraryCatalogPage';
import LibraryLoansPage from './pages/erp/library/LibraryLoansPage';
import ReportsIndexPage from './pages/erp/reports/ReportsIndexPage';
import AttendanceReportPage from './pages/erp/reports/AttendanceReportPage';
import PerformanceReportPage from './pages/erp/reports/PerformanceReportPage';
import FinancialSummaryReportPage from './pages/erp/reports/FinancialSummaryReportPage';
import RoleAssignmentPage from './pages/erp/admin/RoleAssignmentPage';
import RequireAuth from './components/auth/RequireAuth';
import { Toaster } from './components/ui/sonner';

const rootRoute = createRootRoute({
  component: () => <ThemeProvider><RouterProvider router={router} /><Toaster /></ThemeProvider>,
});

const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public',
  component: PublicLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/about',
  component: AboutPage,
});

const academicsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/academics',
  component: AcademicsPage,
});

const admissionsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/admissions',
  component: AdmissionsPage,
});

const facultyRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/faculty',
  component: FacultyPage,
});

const eventsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/events',
  component: EventsPage,
});

const galleryRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/gallery',
  component: GalleryPage,
});

const contactRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/contact',
  component: ContactPage,
});

const campusTourRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/campus-tour',
  component: CampusTourPage,
});

const erpLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/erp/login',
  component: ErpLoginPage,
});

const erpLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'erp',
  path: '/erp',
  component: () => <RequireAuth><ErpLayout /></RequireAuth>,
});

const dashboardRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/',
  component: DashboardPage,
});

const studentsListRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/students',
  component: StudentsListPage,
});

const studentCreateRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/students/create',
  component: StudentCreatePage,
});

const studentDetailRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/students/$studentId',
  component: StudentDetailPage,
});

const studentIdCardRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/students/$studentId/id-card',
  component: StudentIdCardPage,
});

const attendanceOverviewRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/attendance',
  component: AttendanceOverviewPage,
});

const markAttendanceRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/attendance/mark',
  component: MarkAttendancePage,
});

const gradebookRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/grades',
  component: GradebookPage,
});

const reportCardRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/grades/report-card/$studentId',
  component: ReportCardPrintPage,
});

const staffListRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/staff',
  component: StaffListPage,
});

const staffDetailRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/staff/$staffId',
  component: StaffDetailPage,
});

const leaveRequestsRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/leave',
  component: LeaveRequestsPage,
});

const myTimetableRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/timetable',
  component: MyTimetablePage,
});

const classSectionsRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/academics/sections',
  component: ClassSectionsPage,
});

const timetableEditorRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/academics/timetable',
  component: TimetableEditorPage,
});

const examScheduleRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/academics/exams',
  component: ExamSchedulePage,
});

const assignmentsRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/academics/assignments',
  component: AssignmentsPage,
});

const feesOverviewRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/fees',
  component: FeesOverviewPage,
});

const receiptPrintRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/fees/receipt/$feeId',
  component: ReceiptPrintPage,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-success',
  component: PaymentSuccessPage,
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-failure',
  component: PaymentFailurePage,
});

const announcementsRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/announcements',
  component: AnnouncementsPage,
});

const libraryCatalogRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/library',
  component: LibraryCatalogPage,
});

const libraryLoansRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/library/loans',
  component: LibraryLoansPage,
});

const reportsIndexRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/reports',
  component: ReportsIndexPage,
});

const attendanceReportRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/reports/attendance',
  component: AttendanceReportPage,
});

const performanceReportRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/reports/performance',
  component: PerformanceReportPage,
});

const financialReportRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/reports/financial',
  component: FinancialSummaryReportPage,
});

const roleAssignmentRoute = createRoute({
  getParentRoute: () => erpLayoutRoute,
  path: '/admin/roles',
  component: RoleAssignmentPage,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    homeRoute,
    aboutRoute,
    academicsRoute,
    admissionsRoute,
    facultyRoute,
    eventsRoute,
    galleryRoute,
    contactRoute,
    campusTourRoute,
  ]),
  erpLoginRoute,
  erpLayoutRoute.addChildren([
    dashboardRoute,
    studentsListRoute,
    studentCreateRoute,
    studentDetailRoute,
    studentIdCardRoute,
    attendanceOverviewRoute,
    markAttendanceRoute,
    gradebookRoute,
    reportCardRoute,
    staffListRoute,
    staffDetailRoute,
    leaveRequestsRoute,
    myTimetableRoute,
    classSectionsRoute,
    timetableEditorRoute,
    examScheduleRoute,
    assignmentsRoute,
    feesOverviewRoute,
    receiptPrintRoute,
    announcementsRoute,
    libraryCatalogRoute,
    libraryLoansRoute,
    reportsIndexRoute,
    attendanceReportRoute,
    performanceReportRoute,
    financialReportRoute,
    roleAssignmentRoute,
  ]),
  paymentSuccessRoute,
  paymentFailureRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
