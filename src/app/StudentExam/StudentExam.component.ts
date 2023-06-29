import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-StudentExam',
  templateUrl: './StudentExam.component.html',
  styleUrls: ['./StudentExam.component.css'],
})
export class StudentExamComponent implements OnInit {
  constructor(
    private location: Location,
    private service: LoginService,
    private auth: AuthService,
    private route: Router
  ) {}

  hallAllocationFromAdmin: any;
  timetableFromAdmin: any;
  examFeesFromStudent: any;
  detailsFromStudent: any;
  arr: string[] = [];

  ngOnInit() {

    this.service.getAdminExamHallAllocation().subscribe((data) => {
      this.hallAllocationFromAdmin = data;
    });

    this.service.getAdminExamTimetable().subscribe((data) => {
      this.timetableFromAdmin = data;
    });

    this.service.getStudentExamFeesPayment().subscribe((data) => {
      this.examFeesFromStudent = data;
    });

    this.service.getStudentDetails().subscribe((data) => {
      this.detailsFromStudent = data;
      for (var i = 0; i < this.detailsFromStudent.length; i++) {
        this.arr[i] = this.detailsFromStudent[i].REGISTER_NUMBER;
      }
    });
  }

  goBack() {
    this.location.back();
  }

  available: boolean = false;
  registerNumber: any;

  openExamFeesPage(register: any) {
    for (var i = 0; i < this.detailsFromStudent.length; i++) {
      if (register == this.arr[i]) {
        this.available = true;
      }
    }
    if (register == '') {
      alert('Field is Not Empty!!');
    } else if (this.available == false) {
      alert('Register Number Not Exist in Database');
    } else {
      this.registerNumber = register;
      this.route.navigate(['/studentexampayment', this.registerNumber]);
    }
  }

  orderHeader: string = '';
  isDescOrder: boolean = true;

  sort(headerName: string) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }

  hide1: boolean = true;
  hide2: boolean = false;
  hide3: boolean = false;
  hide4: boolean = false;

  openExamHallAllocation() {
    this.hide1 = true;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
  }

  openExamTimetable() {
    this.hide1 = false;
    this.hide2 = true;
    this.hide3 = false;
    this.hide4 = false;
  }

  openPayExamFees() {
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = true;
    this.hide4 = false;
  }

  openExamFeesPaymentList() {
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = true;
  }

  searchText: string = '';

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    // console.log(this.searchText);
  }

  logOut() {
    this.auth.removeToken();
    this.route.navigate(['/login']);
    this.auth.logoutUser() == true;
  }
}
