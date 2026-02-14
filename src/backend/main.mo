import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Storage "blob-storage/Storage";
import Stripe "stripe/stripe";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import OutCall "http-outcalls/outcall";

actor {
  // Include blob storage handling
  include MixinStorage();

  // Include authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Persistent Stripe configuration
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // ERP Role Types - mapped to AccessControl roles
  public type ERPRole = {
    #admin;
    #principal;
    #teacher;
    #student;
    #parent;
    #accountant;
    #librarian;
  };

  public type UserId = Principal;
  public type ClassId = Nat;
  public type CourseId = Nat;
  public type AssessmentId = Nat;
  public type FeeStructureId = Nat;
  public type AnnouncementId = Nat;
  public type BookId = Nat;

  // User Profile (required by frontend)
  public type UserProfile = {
    name : Text;
    erpRoles : [ERPRole];
    email : ?Text;
    phone : ?Text;
  };

  public type ClassSection = {
    id : ClassId;
    name : Text;
    grade : Nat;
    timetable : [Text];
    teacherId : UserId;
  };

  module StudentProfile {
    public type Profile = {
      id : UserId;
      name : Text;
      photo : ?Storage.ExternalBlob;
      parentId : ?UserId;
      status : { #active; #graduated; #inactive };
      classId : ?ClassId;
      gpa : Float;
    };

    public func compare(s1 : Profile, s2 : Profile) : Order.Order {
      Text.compare(s1.name, s2.name);
    };
  };

  public type AttendanceRecord = {
    studentId : UserId;
    classId : ClassId;
    date : Time.Time;
    status : { #present; #absent; #late; #excused };
    notes : ?Text;
  };

  public type Assessment = {
    id : AssessmentId;
    title : Text;
    classId : ClassId;
    type_ : { #assignment; #test; #final };
    maxPoints : Nat;
    weights : Float;
  };

  public type Grade = {
    studentId : UserId;
    assessmentId : AssessmentId;
    points : Nat;
  };

  public type Fee = {
    id : FeeStructureId;
    studentId : UserId;
    amount : Nat;
    dueDate : Time.Time;
    status : { #paid; #pending; #overdue };
    stripeSessionId : ?Text;
  };

  public type Announcement = {
    id : AnnouncementId;
    title : Text;
    body : Text;
    targetGroups : [ERPRole];
    creatorId : UserId;
    timestamp : Time.Time;
  };

  public type Book = {
    id : BookId;
    title : Text;
    author : Text;
    isbn : Text;
    available : Bool;
  };

  // Persistent State Maps
  let userProfiles = Map.empty<UserId, UserProfile>();
  let students = Map.empty<UserId, StudentProfile.Profile>();
  let classes = Map.empty<ClassId, ClassSection>();
  let attendanceRecords = Map.empty<UserId, List.List<AttendanceRecord>>();
  let assessments = Map.empty<ClassId, List.List<Assessment>>();
  let grades = Map.empty<UserId, List.List<Grade>>();
  let fees = Map.empty<UserId, List.List<Fee>>();
  let announcements = Map.empty<AnnouncementId, Announcement>();
  let library = Map.empty<BookId, Book>();
  let checkedOutBooks = Map.empty<BookId, UserId>();

  // ID Counters
  var nextClassId = 1;
  var nextAssessmentId = 1;
  var nextFeeId = 1;
  var nextAnnouncementId = 1;
  var nextBookId = 1;

  // Helper functions for authorization
  private func hasERPRole(user : UserId, role : ERPRole) : Bool {
    switch (userProfiles.get(user)) {
      case (null) { false };
      case (?profile) {
        profile.erpRoles.find<ERPRole>(func(r) { r == role }) != null;
      };
    };
  };

  private func isAdminOrPrincipal(caller : UserId) : Bool {
    AccessControl.isAdmin(accessControlState, caller) or hasERPRole(caller, #principal);
  };

  private func isTeacherOrAdmin(caller : UserId) : Bool {
    isAdminOrPrincipal(caller) or hasERPRole(caller, #teacher);
  };

  private func isAccountantOrAdmin(caller : UserId) : Bool {
    isAdminOrPrincipal(caller) or hasERPRole(caller, #accountant);
  };

  private func isLibrarianOrAdmin(caller : UserId) : Bool {
    isAdminOrPrincipal(caller) or hasERPRole(caller, #librarian);
  };

  private func canAccessStudentData(caller : UserId, studentId : UserId) : Bool {
    // Admin/Principal/Teacher can access all
    if (isTeacherOrAdmin(caller)) { return true };

    // Student can access own data
    if (caller == studentId) { return true };

    // Parent can access their child's data
    switch (students.get(studentId)) {
      case (null) { false };
      case (?student) {
        switch (student.parentId) {
          case (null) { false };
          case (?parentId) { caller == parentId };
        };
      };
    };
  };

  // User Profile Management (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Admin function to assign ERP roles
  public shared ({ caller }) func assignERPRole(user : Principal, role : ERPRole) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can assign ERP roles");
    };

    switch (userProfiles.get(user)) {
      case (null) {
        let newProfile : UserProfile = {
          name = "";
          erpRoles = [role];
          email = null;
          phone = null;
        };
        userProfiles.add(user, newProfile);
      };
      case (?profile) {
        let updatedRoles = profile.erpRoles.concat([role]);
        let updatedProfile : UserProfile = {
          name = profile.name;
          erpRoles = updatedRoles;
          email = profile.email;
          phone = profile.phone;
        };
        userProfiles.add(user, updatedProfile);
      };
    };
  };

  // Class (Section) Management
  public shared ({ caller }) func createClassSection(name : Text, grade : Nat, timetable : [Text], teacherId : Principal) : async ClassId {
    if (not isAdminOrPrincipal(caller)) {
      Runtime.trap("Unauthorized: Only admins/principals can create class sections");
    };

    let classId = nextClassId;
    nextClassId += 1;

    let classSection : ClassSection = {
      id = classId;
      name;
      grade;
      timetable;
      teacherId;
    };

    classes.add(classId, classSection);
    classId;
  };

  public query ({ caller }) func getClassSection(classId : ClassId) : async ClassSection {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view class sections");
    };

    switch (classes.get(classId)) {
      case (null) { Runtime.trap("Class section not found") };
      case (?c) { c };
    };
  };

  public query ({ caller }) func getAllClassSections() : async [ClassSection] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view class sections");
    };
    classes.values().toArray();
  };

  // Student Management
  public shared ({ caller }) func registerStudent(name : Text, photo : ?Storage.ExternalBlob, parentId : ?UserId, classId : ?ClassId) : async () {
    if (not isAdminOrPrincipal(caller)) {
      Runtime.trap("Unauthorized: Only admins/principals can register students");
    };

    // Note: This registers a student profile, but the student's principal must be provided separately
    // In a real implementation, you'd pass studentId as a parameter
    let studentId = caller; // Placeholder - should be a parameter

    switch (students.get(studentId)) {
      case (?_) { Runtime.trap("Student already exists") };
      case (null) {
        let student : StudentProfile.Profile = {
          id = studentId;
          name;
          photo;
          parentId;
          status = #active;
          classId;
          gpa = 0.0;
        };
        students.add(studentId, student);

        // Assign student role
        switch (userProfiles.get(studentId)) {
          case (null) {
            let newProfile : UserProfile = {
              name;
              erpRoles = [#student];
              email = null;
              phone = null;
            };
            userProfiles.add(studentId, newProfile);
          };
          case (?profile) {
            let updatedProfile : UserProfile = {
              name = profile.name;
              erpRoles = profile.erpRoles.concat([#student]);
              email = profile.email;
              phone = profile.phone;
            };
            userProfiles.add(studentId, updatedProfile);
          };
        };
      };
    };
  };

  public query ({ caller }) func getStudent(studentId : UserId) : async StudentProfile.Profile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view student data");
    };

    if (not canAccessStudentData(caller, studentId)) {
      Runtime.trap("Unauthorized: Cannot access this student's data");
    };

    switch (students.get(studentId)) {
      case (null) { Runtime.trap("Student not found") };
      case (?student) { student };
    };
  };

  public shared ({ caller }) func updateStudentStatus(studentId : UserId, status : { #active; #graduated; #inactive }) : async () {
    if (not isAdminOrPrincipal(caller)) {
      Runtime.trap("Unauthorized: Only admins/principals can update student status");
    };

    switch (students.get(studentId)) {
      case (null) { Runtime.trap("Student does not exist") };
      case (?student) {
        let updatedStudent : StudentProfile.Profile = {
          id = student.id;
          name = student.name;
          photo = student.photo;
          parentId = student.parentId;
          status;
          classId = student.classId;
          gpa = student.gpa;
        };
        students.add(studentId, updatedStudent);
      };
    };
  };

  public query ({ caller }) func getAllStudents() : async [StudentProfile.Profile] {
    if (not isTeacherOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only teachers/admins can view all students");
    };
    students.values().toArray().sort();
  };

  // Attendance Management
  public shared ({ caller }) func markAttendance(classId : ClassId, records : [(UserId, { #present; #absent; #late; #excused })]) : async () {
    if (not isTeacherOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only teachers/admins can mark attendance");
    };

    let today = Time.now();

    for ((studentId, status) in records.values()) {
      let record : AttendanceRecord = {
        studentId;
        classId;
        date = today;
        status;
        notes = null;
      };

      switch (attendanceRecords.get(studentId)) {
        case (null) {
          let newList = List.empty<AttendanceRecord>();
          newList.add(record);
          attendanceRecords.add(studentId, newList);
        };
        case (?existing) {
          existing.add(record);
        };
      };
    };
  };

  public query ({ caller }) func getAttendance(studentId : UserId) : async [AttendanceRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view attendance");
    };

    if (not canAccessStudentData(caller, studentId)) {
      Runtime.trap("Unauthorized: Cannot access this student's attendance");
    };

    switch (attendanceRecords.get(studentId)) {
      case (null) { [] };
      case (?records) {
        records.toArray();
      };
    };
  };

  // Assessment & Grade Management
  public shared ({ caller }) func createAssessment(classId : ClassId, title : Text, type_ : { #assignment; #test; #final }, maxPoints : Nat, weights : Float) : async AssessmentId {
    if (not isTeacherOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only teachers/admins can create assessments");
    };

    let assessment : Assessment = {
      id = nextAssessmentId;
      title;
      classId;
      type_;
      maxPoints;
      weights;
    };

    switch (assessments.get(classId)) {
      case (null) {
        let newList = List.empty<Assessment>();
        newList.add(assessment);
        assessments.add(classId, newList);
      };
      case (?existing) {
        existing.add(assessment);
      };
    };

    nextAssessmentId += 1;
    assessment.id;
  };

  public query ({ caller }) func getAssessmentsForClass(classId : ClassId) : async [Assessment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view assessments");
    };

    switch (assessments.get(classId)) {
      case (null) { [] };
      case (?assessmentList) {
        assessmentList.toArray();
      };
    };
  };

  public shared ({ caller }) func addGrade(studentId : UserId, assessmentId : AssessmentId, points : Nat) : async () {
    if (not isTeacherOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only teachers/admins can add grades");
    };

    let grade : Grade = {
      studentId;
      assessmentId;
      points;
    };

    switch (grades.get(studentId)) {
      case (null) {
        let newList = List.empty<Grade>();
        newList.add(grade);
        grades.add(studentId, newList);
      };
      case (?existing) {
        existing.add(grade);
      };
    };
  };

  public query ({ caller }) func getGrades(studentId : UserId) : async [Grade] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view grades");
    };

    if (not canAccessStudentData(caller, studentId)) {
      Runtime.trap("Unauthorized: Cannot access this student's grades");
    };

    switch (grades.get(studentId)) {
      case (null) { [] };
      case (?gradeList) {
        gradeList.toArray();
      };
    };
  };

  public query ({ caller }) func calculateStudentGpa(studentId : UserId) : async Float {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can calculate GPA");
    };

    if (not canAccessStudentData(caller, studentId)) {
      Runtime.trap("Unauthorized: Cannot access this student's GPA");
    };

    let studentGrades = switch (grades.get(studentId)) {
      case (null) { return 0.0 };
      case (?g) { g };
    };

    if (studentGrades.size() == 0) { return 0.0 };

    var totalWeighted = 0.0;
    var totalWeights = 0.0;

    for (grade in studentGrades.values()) {
      let assessment = assessments.values().find(
        func(assessmentsList) {
          assessmentsList.toArray().find(
            func(a) { a.id == grade.assessmentId }
          ) != null;
        }
      );

      switch (assessment) {
        case (?assessmentList) {
          let foundAssessments = assessmentList.toArray().filter(
            func(a) { a.id == grade.assessmentId }
          );
          if (foundAssessments.size() > 0) {
            let found = foundAssessments[0];
            let weighted = (grade.points.toFloat() / found.maxPoints.toFloat()) * found.weights;
            totalWeighted += weighted;
            totalWeights += found.weights;
          };
        };
      };
    };

    if (totalWeights == 0) { return 0.0 };

    (totalWeighted / totalWeights) * 4.0; // GPA out of 4.0
  };

  // Announcement Management
  public shared ({ caller }) func createAnnouncement(title : Text, body : Text, targetGroups : [ERPRole]) : async AnnouncementId {
    if (not isAdminOrPrincipal(caller)) {
      Runtime.trap("Unauthorized: Only admins/principals can create announcements");
    };

    let announcement : Announcement = {
      id = nextAnnouncementId;
      title;
      body;
      targetGroups;
      creatorId = caller;
      timestamp = Time.now();
    };

    announcements.add(nextAnnouncementId, announcement);
    nextAnnouncementId += 1;
    announcement.id;
  };

  public query ({ caller }) func getAnnouncements() : async [Announcement] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view announcements");
    };

    // Filter announcements based on user's roles
    switch (userProfiles.get(caller)) {
      case (null) { [] };
      case (?profile) {
        let userRoles = profile.erpRoles;
        announcements.values().toArray().filter(
          func(announcement) {
            // Check if any of the user's roles match the target groups
            announcement.targetGroups.find<ERPRole>(
              func(targetRole) {
                userRoles.find<ERPRole>(func(userRole) { userRole == targetRole }) != null;
              }
            ) != null;
          }
        );
      };
    };
  };

  // Fee Management
  public shared ({ caller }) func createFee(studentId : UserId, amount : Nat, dueDate : Time.Time) : async FeeStructureId {
    if (not isAccountantOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only accountants/admins can create fees");
    };

    let fee : Fee = {
      id = nextFeeId;
      studentId;
      amount;
      dueDate;
      status = #pending;
      stripeSessionId = null;
    };

    switch (fees.get(studentId)) {
      case (null) {
        let newList = List.empty<Fee>();
        newList.add(fee);
        fees.add(studentId, newList);
      };
      case (?existing) {
        existing.add(fee);
      };
    };

    nextFeeId += 1;
    fee.id;
  };

  public query ({ caller }) func getFees(studentId : UserId) : async [Fee] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view fees");
    };

    if (not canAccessStudentData(caller, studentId) and not isAccountantOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Cannot access this student's fees");
    };

    switch (fees.get(studentId)) {
      case (null) { [] };
      case (?feeList) {
        feeList.toArray();
      };
    };
  };

  public shared ({ caller }) func markFeePaid(studentId : UserId, feeId : FeeStructureId) : async () {
    if (not isAccountantOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only accountants/admins can mark fees as paid");
    };

    switch (fees.get(studentId)) {
      case (null) { Runtime.trap("Fees not found for student") };
      case (?feeList) {
        let updatedFees = feeList.toArray().map(
          func(f : Fee) : Fee {
            if (f.id == feeId) {
              {
                id = f.id;
                studentId = f.studentId;
                amount = f.amount;
                dueDate = f.dueDate;
                status = #paid;
                stripeSessionId = f.stripeSessionId;
              };
            } else { f };
          }
        );
        fees.add(studentId, List.fromArray<Fee>(updatedFees));
      };
    };
  };

  // Library Management
  public shared ({ caller }) func addBook(title : Text, author : Text, isbn : Text) : async BookId {
    if (not isLibrarianOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only librarians/admins can add books");
    };

    let book : Book = {
      id = nextBookId;
      title;
      author;
      isbn;
      available = true;
    };

    library.add(nextBookId, book);
    nextBookId += 1;
    book.id;
  };

  public query ({ caller }) func getBooks() : async [Book] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view books");
    };
    library.values().toArray();
  };

  public shared ({ caller }) func checkoutBook(bookId : BookId, studentId : UserId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can checkout books");
    };

    // Students can only checkout for themselves, librarians/admins can checkout for anyone
    if (caller != studentId and not isLibrarianOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Can only checkout books for yourself");
    };

    switch (library.get(bookId)) {
      case (null) { Runtime.trap("Book does not exist") };
      case (?book) {
        if (not book.available) { Runtime.trap("Book is not available") };
        checkedOutBooks.add(bookId, studentId);
        let updatedBook : Book = {
          id = book.id;
          title = book.title;
          author = book.author;
          isbn = book.isbn;
          available = false;
        };
        library.add(bookId, updatedBook);
      };
    };
  };

  public shared ({ caller }) func returnBook(bookId : BookId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can return books");
    };

    switch (library.get(bookId)) {
      case (null) { Runtime.trap("Book does not exist") };
      case (?book) {
        if (book.available) { Runtime.trap("Book is already available") };

        // Verify the caller is the one who checked out the book or is a librarian/admin
        switch (checkedOutBooks.get(bookId)) {
          case (null) { Runtime.trap("Book checkout record not found") };
          case (?borrowerId) {
            if (caller != borrowerId and not isLibrarianOrAdmin(caller)) {
              Runtime.trap("Unauthorized: Can only return books you checked out");
            };
          };
        };

        checkedOutBooks.remove(bookId);
        let updatedBook : Book = {
          id = book.id;
          title = book.title;
          author = book.author;
          isbn = book.isbn;
          available = true;
        };
        library.add(bookId, updatedBook);
      };
    };
  };

  public query ({ caller }) func getCheckedOutBooks() : async [(BookId, UserId)] {
    if (not isLibrarianOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only librarians/admins can view all checked out books");
    };
    checkedOutBooks.entries().toArray();
  };

  // Stripe payment integration
  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set Stripe configuration");
    };
    stripeConfig := ?config;
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    let config = switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe configuration not set") };
      case (?c) { c };
    };
    await Stripe.getSessionStatus(config, sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    let config = switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe configuration not set") };
      case (?c) { c };
    };
    let result = await Stripe.createCheckoutSession(config, caller, items, successUrl, cancelUrl, transform);
    result;
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
