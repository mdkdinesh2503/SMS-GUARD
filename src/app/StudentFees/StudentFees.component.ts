import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-StudentFees',
  templateUrl: './StudentFees.component.html',
  styleUrls: ['./StudentFees.component.css'],
})
export class StudentFeesComponent implements OnInit {
  constructor(
    private location: Location,
    private route: Router,
    private service: LoginService,
    private auth:AuthService
  ) {}

  detailsFromStudent: any;
  loginUserName:any = this.auth.displayToken() ;
  arr: string[] = [];

  ngOnInit() {

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

  orderHeader: string = '';
  isDescOrder: boolean = true;

  sort(headerName: string) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }

  hideContainer: boolean = true;
  openHiddenPage: boolean = false;

  registers: any = '';
  available: boolean = false;

  openFeesPage(registerNumber: any) {
    for (var i = 0; i < this.detailsFromStudent.length; i++) {
      if (registerNumber == this.arr[i]) {
        this.available = true;
      }
    }
    if (registerNumber == '') {
      alert('Field is Not Empty!!');
    } else if (this.available == false) {
      alert('Register Number Not Exist in Database');
    } else {
      this.registers = registerNumber;
      this.hideContainer = false;
      this.openHiddenPage = true;
    }
  }

  payment(paymentValue: any) {
    var register = this.registers;

    this.route.navigate(['/studentfeespayment', register, paymentValue]);
  }

  logOut() {
    this.auth.removeToken();
    this.route.navigate(['/login']);
    this.auth.logoutUser() == true;
  }

}
