import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface Profile {
    id: UserId;
    gpa: number;
    status: Variant_active_inactive_graduated;
    name: string;
    classId?: ClassId;
    photo?: ExternalBlob;
    parentId?: UserId;
}
export type AssessmentId = bigint;
export interface Grade {
    studentId: UserId;
    assessmentId: AssessmentId;
    points: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Announcement {
    id: AnnouncementId;
    title: string;
    body: string;
    creatorId: UserId;
    timestamp: Time;
    targetGroups: Array<ERPRole>;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface AttendanceRecord {
    status: Variant_present_late_absent_excused;
    studentId: UserId;
    date: Time;
    classId: ClassId;
    notes?: string;
}
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export type ClassId = bigint;
export type BookId = bigint;
export interface ClassSection {
    id: ClassId;
    timetable: Array<string>;
    name: string;
    grade: bigint;
    teacherId: UserId;
}
export interface Assessment {
    id: AssessmentId;
    title: string;
    maxPoints: bigint;
    type: Variant_final_assignment_test;
    classId: ClassId;
    weights: number;
}
export interface Fee {
    id: FeeStructureId;
    status: Variant_pending_paid_overdue;
    studentId: UserId;
    dueDate: Time;
    stripeSessionId?: string;
    amount: bigint;
}
export type FeeStructureId = bigint;
export interface Book {
    id: BookId;
    title: string;
    isbn: string;
    author: string;
    available: boolean;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = Principal;
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export type AnnouncementId = bigint;
export interface UserProfile {
    name: string;
    erpRoles: Array<ERPRole>;
    email?: string;
    phone?: string;
}
export enum ERPRole {
    accountant = "accountant",
    principal = "principal",
    librarian = "librarian",
    admin = "admin",
    teacher = "teacher",
    student = "student",
    parent = "parent"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_active_inactive_graduated {
    active = "active",
    inactive = "inactive",
    graduated = "graduated"
}
export enum Variant_final_assignment_test {
    final_ = "final",
    assignment = "assignment",
    test = "test"
}
export enum Variant_pending_paid_overdue {
    pending = "pending",
    paid = "paid",
    overdue = "overdue"
}
export enum Variant_present_late_absent_excused {
    present = "present",
    late = "late",
    absent = "absent",
    excused = "excused"
}
export interface backendInterface {
    addBook(title: string, author: string, isbn: string): Promise<BookId>;
    addGrade(studentId: UserId, assessmentId: AssessmentId, points: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignERPRole(user: Principal, role: ERPRole): Promise<void>;
    calculateStudentGpa(studentId: UserId): Promise<number>;
    checkoutBook(bookId: BookId, studentId: UserId): Promise<void>;
    createAnnouncement(title: string, body: string, targetGroups: Array<ERPRole>): Promise<AnnouncementId>;
    createAssessment(classId: ClassId, title: string, type: Variant_final_assignment_test, maxPoints: bigint, weights: number): Promise<AssessmentId>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createClassSection(name: string, grade: bigint, timetable: Array<string>, teacherId: Principal): Promise<ClassId>;
    createFee(studentId: UserId, amount: bigint, dueDate: Time): Promise<FeeStructureId>;
    getAllClassSections(): Promise<Array<ClassSection>>;
    getAllStudents(): Promise<Array<Profile>>;
    getAnnouncements(): Promise<Array<Announcement>>;
    getAssessmentsForClass(classId: ClassId): Promise<Array<Assessment>>;
    getAttendance(studentId: UserId): Promise<Array<AttendanceRecord>>;
    getBooks(): Promise<Array<Book>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCheckedOutBooks(): Promise<Array<[BookId, UserId]>>;
    getClassSection(classId: ClassId): Promise<ClassSection>;
    getFees(studentId: UserId): Promise<Array<Fee>>;
    getGrades(studentId: UserId): Promise<Array<Grade>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getStudent(studentId: UserId): Promise<Profile>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    markAttendance(classId: ClassId, records: Array<[UserId, Variant_present_late_absent_excused]>): Promise<void>;
    markFeePaid(studentId: UserId, feeId: FeeStructureId): Promise<void>;
    registerStudent(name: string, photo: ExternalBlob | null, parentId: UserId | null, classId: ClassId | null): Promise<void>;
    returnBook(bookId: BookId): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateStudentStatus(studentId: UserId, status: Variant_active_inactive_graduated): Promise<void>;
}
