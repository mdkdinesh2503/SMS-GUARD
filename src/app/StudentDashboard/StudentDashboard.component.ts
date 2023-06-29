import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-StudentDashboard',
  templateUrl: './StudentDashboard.component.html',
  styleUrls: ['./StudentDashboard.component.css'],
})
export class StudentDashboardComponent implements OnInit {
  constructor(
    private service: LoginService,
    private datepipe: DatePipe,
    private auth: AuthService,
    private route:Router
  ) {
    this.setNow();
  }

  loginUserName: any = this.auth.displayToken();

  attendanceFromStudent: any = '';

  ngOnInit() {
    this.service.getStudentAttendance().subscribe((data) => {
      this.attendanceFromStudent = data;
    });

  }

  hours: string = '';
  minutes: string = '';
  second: string = '';
  day: string = '';
  month: string = '';
  year: string = '';
  dates: any = this.datepipe.transform(new Date(), 'dd');
  ampm: any = '';

  setNow() {
    setInterval(() => {
      var date = new Date();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var seconds = date.getSeconds();
      var day = date.getDay();
      var days = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Augest',
        'September',
        'October',
        'November',
        'December',
      ];
      var week = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      var month = date.getMonth();
      var year = date.getFullYear();

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

      this.second = '' + seconds + '';

      if (this.second.length == 1) {
        this.second = '0' + seconds + '';
      } else {
        this.second = '' + seconds + '';
      }

      this.day = '' + week[day] + '';
      this.month = '' + days[month] + '';
      this.year = '' + year + '';
      this.ampm = '' + ampm + '';
    }, 1000);
  }

  logOut() {
    this.auth.removeToken();
    this.route.navigate(['/login']);
    this.auth.logoutUser() == true;
  }

}
