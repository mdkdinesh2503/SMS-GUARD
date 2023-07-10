import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { DatePipe, Location } from '@angular/common';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-StudentReview',
  templateUrl: './StudentReview.component.html',
  styleUrls: ['./StudentReview.component.css'],
})
export class StudentReviewComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private location: Location,
    private route: Router,
    private loginService: LoginService,
    private datePipe: DatePipe,
    private userService: UserService
  ) {
    this.setNow();
  }

  times: string = '';
  hours: string = '';
  minutes: string = '';
  seconds: string = '';

  dates:any = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

  setNow() {
    setInterval(() => {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var ampm = "";

    if (hour >= 12) {
      ampm = 'PM';
    } else {
      ampm = 'AM';
    }

    if (hour > 12) {
      hour = hour - 12;
    }

    this.hours = '' + hour + '';

      if (this.hours.length == 1) {
        this.hours = '0' + hour + '';
      } else {
        this.hours = '' + hour + '';
      }

      this.minutes = '' + minute + '';

      if (this.minutes.length == 1) {
        this.minutes = '0' + minute + '';
      } else {
        this.minutes = '' + minute + '';
      }

      this.seconds = '' + second + '';

      if (this.seconds.length == 1) {
        this.seconds = '0' + second + '';
      } else {
        this.seconds = '' + second + '';
      }

    this.times = this.hours + ":" + this.minutes + ":" + this.seconds + " " + ampm;
  }, 1000);
  }

  goBack() {
    this.location.back();
  }

  detailsFromStudent:any;
  studentRegisterNo:any ;
  studentName:any;
  getIdVal:any = this.auth.displayIdToken();

  ngOnInit() {
    this.loginService.getStudentDetails().subscribe((data) => {
      this.detailsFromStudent = data;
      this.studentRegisterNo = this.detailsFromStudent[this.getIdVal].REGISTER_NUMBER;
      this.studentName = this.detailsFromStudent[this.getIdVal].NAME;
    });
  }

  submitList(
    field: any,
    reviewfield :any,
    message: any
  ) {

    var body = {
      REGISTER_NUMBER: this.studentRegisterNo,
      NAME: this.studentName,
      RATING : reviewfield,
      DEPARTMENT: field,
      DATE: this.dates,
      TIME: this.times,
      MESSAGE: message,
    };

    if(field != "" &&  message != "" && reviewfield != "") {
      this.userService.addStudentReview(body).subscribe((data) => {
        alert('Student Review marked successfully');
        window.location.reload();
      });
    }else{
      alert("Field Does not Empty!!");
    }
  }

  logOut() {
    this.auth.removeToken();
    this.route.navigate(['/login']);
    this.auth.logoutUser() == true;
  }

}
