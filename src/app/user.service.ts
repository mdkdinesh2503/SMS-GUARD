import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client:HttpClient) { }

  addRegisters(body:any){

    return this.client.post("http://localhost:3000/Registers",body);

  }

  loginDetails(body:any){

    return this.client.post("http://localhost:3000/loginlist",body);

  }

  adminTimetable(body:any){

    return this.client.post("http://localhost:3000/AdminTimetable",body);

  }

  adminResults(body:any){

    return this.client.post("http://localhost:3000/AdminResult",body);

  }

  adminReports(body:any){

    return this.client.post("http://localhost:3000/AdminReports",body);

  }

  studentAttendance(body:any){

    return this.client.post("http://localhost:3000/StudentAttendance",body);

  }

  studentDetails(body:any){

    return this.client.post("http://localhost:3000/StudentDetails",body);

  }

  studentReports(body:any){

    return this.client.post("http://localhost:3000/StudentReports",body);

  }

  deleteUserData(body:any) {

    return this.client.delete("http://localhost:3000/Registers"+"/"+body);

  }

  deleteStudentDetails(body:any) {

    return this.client.delete("http://localhost:3000/StudentDetails"+"/"+body);

  }

  deleteadminResults(body:any) {

    return this.client.delete("http://localhost:3000/AdminResult"+"/"+body);

  }

  deleteAdminTimetable(body:any) {

    return this.client.delete("http://localhost:3000/AdminTimetable"+"/"+body);

  }

  deleteStudentReview(body:any) {

    return this.client.delete("http://localhost:3000/StudentReview"+"/"+body);

  }

  adminExamHallAllocation(body:any){

    return this.client.post("http://localhost:3000/AdminExamHallAllocation",body);

  }

  adminExamTimetable(body:any){

    return this.client.post("http://localhost:3000/AdminExamTimetable",body);

  }

  studentExamFeesPayment(body:any){

    return this.client.post("http://localhost:3000/StudentExamFeesPayment",body);

  }

  newsLetter(body:any){

    return this.client.post("http://localhost:3000/NewsLetter",body);

  }

  studentCollegeFeesPayment(body:any){

    return this.client.post("http://localhost:3000/StudentCollegeFeesPayment",body);

  }

  addStudentReview(body:any) {

    return this.client.post("http://localhost:3000/StudentReview",body);

  }

}
