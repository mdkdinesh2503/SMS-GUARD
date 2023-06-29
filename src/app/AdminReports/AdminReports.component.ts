import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-AdminReports',
  templateUrl: './AdminReports.component.html',
  styleUrls: ['./AdminReports.component.css'],
})
export class AdminReportsComponent implements OnInit {
  constructor(
    private location: Location,
    private route: Router,
    private userService: UserService,
    private service:LoginService,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

    reportsFromStudent : any = '';

  ngOnInit() {
    this.service.getStudentReports().subscribe((data) => {
      this.reportsFromStudent = data;
    });
  }

  goBack() {
    this.location.back();
  }

  AdminReportForm = this.fb.group(
    {
      Name: [''],
      Email: [''],
      Subject: [''],
      Message: [''],
    });

  submitList() {
    this.userService.adminReports(this.AdminReportForm.value).subscribe((data) => {
      alert('Parents Reports send successfully');
      window.location.reload();
    });
  }

  orderHeader :string = '';
  isDescOrder : boolean = true;

  sort(headerName:string) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }

  editAdminReport(id:any) {
    this.route.navigate(['/adminreportview',id]);
  }

  searchText: string = '';

  onSearchTextEntered(searchValue:string) {
    this.searchText = searchValue;
    // console.log(this.searchText);
  }

  logOut() {
    this.auth.removeToken();
    this.route.navigate(['/login']);
    this.auth.logoutAdmin() == true;
  }

}
