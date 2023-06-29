import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-AdminFees',
  templateUrl: './AdminFees.component.html',
  styleUrls: ['./AdminFees.component.css'],
})
export class AdminFeesComponent implements OnInit {
  constructor(
    private location: Location,
    private service: LoginService,
    private auth: AuthService,
    private route: Router
  ) {}

  FeesPaymentFromStudent: any;

  ngOnInit() {
    this.service.getStudentCollegeFeesPaymentUrl().subscribe((data) => {
      this.FeesPaymentFromStudent = data;
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
