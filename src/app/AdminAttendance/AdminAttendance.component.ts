import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-AdminAttendance',
  templateUrl: './AdminAttendance.component.html',
  styleUrls: ['./AdminAttendance.component.css'],
})
export class AdminAttendanceComponent implements OnInit {
  constructor(
    private location: Location,
    private service: LoginService,
    private auth: AuthService,
    private route:Router
  ) {
    this.countPresent();
  }

  countPresent() {}

  value: number = 0;
  loginUserName: any = this.auth.displayToken();
  attendanceFromStudent: any = '';

  ngOnInit() {

    this.service.getStudentAttendance().subscribe((data) => {
      this.attendanceFromStudent = data;

      for (var i = 1; i < this.attendanceFromStudent.length; i++) {
        if (this.attendanceFromStudent[i].ATTENDANCE_FIELD == 'Present') {
          this.value = this.value + 1;
        }
      }

      if (this.value == 0) {
        this.value = 0;
      } else {
        this.value = this.value + 1;
      }
    });
  }

  goBack() {
    this.location.back();
  }

  orderHeader: string = '';
  isDescOrder: boolean = true;

  sort(headerName: string) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }

  searchText: string = '';

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }

  logOut() {
    this.auth.removeToken();
    this.route.navigate(['/login']);
    this.auth.logoutAdmin() == true;
  }
}
