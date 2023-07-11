import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-AdminDetails',
  templateUrl: './AdminDetails.component.html',
  styleUrls: ['./AdminDetails.component.css'],
})
export class AdminDetailsComponent implements OnInit {
  constructor(
    private location: Location,
    private service: LoginService,
    private userService: UserService,
    private auth: AuthService,
    private route:Router
  ) {}

  detailsFromStudent: any = '';
  student: any = [];

  ngOnInit() {
    this.service.getStudentDetails().subscribe((data) => {
      this.detailsFromStudent = data;
      this.student = data;
    });
  }

  goBack() {
    this.location.back();
  }

  deleteData(id: any) {
    if (confirm('Are you sure You want to delete this data')) {
      this.userService.deleteStudentDetails(id).subscribe((data) => {
        alert('Successfully deleted');
        window.location.reload();
      });
    }
  }

  orderHeader: string = '';
  isDescOrder: boolean = true;

  sort(headerName: string) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }

  editAdminDetails(id: any, register:any) {
    this.route.navigate(['/admindetailsview', id, register]);
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

  clickToConvert(filename:string, data:any) {
    this.auth.onExportClick(filename, data);
  }

}
