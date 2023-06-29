import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-StudentAttendance',
  templateUrl: './StudentAttendance.component.html',
  styleUrls: ['./StudentAttendance.component.css'],
})
export class StudentAttendanceComponent implements OnInit {
  constructor(
    private location: Location,
    private route: Router,
    private userService: UserService,
    private loginService: LoginService,
    private datepipe: DatePipe,
    private auth: AuthService
  ) {
    this.setNow();
    setInterval(() => {
      var att_date = new Date();
      var att_hour = att_date.getHours();
      var att_week = att_date.getDay();
      var att_minute = att_date.getMinutes();
      var ampm = '';

      if (att_hour >= 12) {
        ampm = 'PM';
      } else {
        ampm = 'AM';
      }

      if (att_hour > 12) {
        att_hour = att_hour - 12;
      }

      if (att_week == 6 || att_week == 7) {
        this.hidbtn = true;
        this.disbtn = true;
      }

      if (
        att_hour == 9 &&
        att_minute >= 15 &&
        att_minute <= 30 &&
        ampm == 'AM'
      ) {
        this.option1 = true;
        this.option2 = true;
        this.option3 = false;
      } else if (
        att_hour == 9 &&
        att_minute > 30 &&
        att_minute <= 45 &&
        ampm == 'AM'
      ) {
        this.option1 = false;
        this.option2 = true;
        this.option3 = true;
      } else if (
        att_hour == 9 &&
        att_minute > 45 &&
        att_minute <= 59 &&
        ampm == 'AM'
      ) {
        this.option1 = false;
        this.option2 = true;
        this.option3 = false;
      } else {
        this.disbtn = true;
      }
    }, 1000);
  }

  ngOnInit() {

    this.loginService.getStudentDetails().subscribe((data) => {
      this.detailsFromStudent = data;
      this.studentRegisterNo = this.detailsFromStudent[this.getIdVal].REGISTER_NUMBER;
      this.studentName = this.detailsFromStudent[this.getIdVal].NAME;
    });
  }

  loginUserName: any = this.auth.displayToken();
  detailsFromStudent:any;
  studentRegisterNo:any ;
  studentName:any;
  getIdVal:any = this.auth.displayIdToken();

  dates: any = this.datepipe.transform(new Date(), 'dd-MM-yyyy');

  times: string = '';
  hours: string = '';
  minutes: string = '';
  seconds: string = '';
  option1: boolean = false;
  option2: boolean = false;
  option3: boolean = false;
  disbtn: boolean = false;
  hidbtn: boolean = false;

  setNow() {
    setInterval(() => {
      var date = new Date();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      var ampm = '';

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

      this.times =
        this.hours + ':' + this.minutes + ':' + this.seconds + ' ' + ampm;
    }, 1000);
  }

  goBack() {
    this.location.back();
  }

  submitList(field: any) {
    var body = {
      NAME: this.studentName,
      REGISTER_NUMBAR: this.studentRegisterNo,
      ATTENDANCE_FIELD: field,
      DATE: this.dates,
      TIME: this.times,
    };

    if (field != '') {
      this.userService.studentAttendance(body).subscribe((data) => {
        alert('Student Attendance Submitted successfully');
        window.location.reload();
      });
    } else {
      alert('Fields does not Empty!!');
    }
  }

  logOut() {
    this.auth.removeToken();
    this.route.navigate(['/login']);
    this.auth.logoutUser() == true;
  }
}
