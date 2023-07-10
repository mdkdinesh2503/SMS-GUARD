import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  registerUrl:any = "http://localhost:3000/Registers";
  adminListUrl:any= "http://localhost:3000/AdminList";
  studentDetailsUrl:any= "http://localhost:3000/StudentDetails";
  studentAttendanceUrl:any= "http://localhost:3000/StudentAttendance";
  studentReportsUrl:any= "http://localhost:3000/StudentReports";
  adminTimetableUrl:any= "http://localhost:3000/AdminTimetable";
  adminResultUrl:any= "http://localhost:3000/AdminResult";
  adminParentsReportUrl:any= "http://localhost:3000/AdminReports";
  adminExamHallAllocationUrl:any="http://localhost:3000/AdminExamHallAllocation";
  adminExamTimetableUrl:any="http://localhost:3000/AdminExamTimetable";
  studentExamFeesPaymentUrl :any="http://localhost:3000/StudentExamFeesPayment";
  studentCollegeFeesPaymentUrl :any="http://localhost:3000/StudentCollegeFeesPayment";
  quotesDisplayUrl :any="http://localhost:3000/Quotes";
  studentReview :any="http://localhost:3000/StudentReview";

  getRegisterDetails() {
    return this.http.get(this.registerUrl);
  }

  getAdminListDetails() {
    return this.http.get(this.adminListUrl);
  }

  getStudentDetails() {
    return this.http.get(this.studentDetailsUrl);
  }

  getStudentAttendance() {
    return this.http.get(this.studentAttendanceUrl);
  }

  getStudentReports() {
    return this.http.get(this.studentReportsUrl);
  }

  getAdminTimetable() {
    return this.http.get(this.adminTimetableUrl);
  }

  getAdminResult() {
    return this.http.get(this.adminResultUrl);
  }

  getAdminParentsReport() {
    return this.http.get(this.adminParentsReportUrl);
  }

  getAdminExamHallAllocation(){
    return this.http.get(this.adminExamHallAllocationUrl);
  }

  getAdminExamTimetable(){
    return this.http.get(this.adminExamTimetableUrl);
  }

  getStudentExamFeesPayment(){
    return this.http.get(this.studentExamFeesPaymentUrl);
  }

  getStudentCollegeFeesPaymentUrl(){
    return this.http.get(this.studentCollegeFeesPaymentUrl);
  }

  getquotesDisplay(){
    return this.http.get(this.quotesDisplayUrl);
  }

  getStudentReview() {
    return this.http.get(this.studentReview);
  }

}
