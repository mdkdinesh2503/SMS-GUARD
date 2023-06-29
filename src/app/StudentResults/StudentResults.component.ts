import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-StudentResults',
  templateUrl: './StudentResults.component.html',
  styleUrls: ['./StudentResults.component.css'],
})
export class StudentResultsComponent implements OnInit {
  constructor(
    private location: Location,
    private service: LoginService,
    private route: Router,
    private auth:AuthService
  ) {}

  loginUserName:any = this.auth.displayToken() ;
  resultsFromAdmin: any = '';

  ngOnInit() {

    this.service.getAdminResult().subscribe((data) => {
      this.resultsFromAdmin = data;
    });
  }

  goBack() {
    this.location.back();
  }

  viewStudentResult(register:any) {
    this.route.navigate(['/studentresultview', register]);
  }

  orderHeader: string = '';
  isDescOrder: boolean = true;

  sort(headerName: string) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }

  searchText: string = '';

  onSearchTextEntered(searchValue:string) {
    this.searchText = searchValue;
    // console.log(this.searchText);
  }

  logOut() {
    this.auth.removeToken();
    this.route.navigate(['/login']);
    this.auth.logoutUser() == true;
  }

}
