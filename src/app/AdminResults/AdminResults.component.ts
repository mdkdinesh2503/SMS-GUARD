import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-AdminResults',
  templateUrl: './AdminResults.component.html',
  styleUrls: ['./AdminResults.component.css'],
})
export class AdminResultsComponent implements OnInit {
  constructor(
    private location: Location,
    private route: Router,
    private userService: UserService,
    private service: LoginService,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  resultsFromAdmin: any = '';

  ngOnInit() {
    this.service.getAdminResult().subscribe((data) => {
      this.resultsFromAdmin = data;
    });
  }

  goBack() {
    this.location.back();
  }

  ResultForm = this.fb.group(
    {
      REGISTER_NUMBER: [''],
      NAME: [''],
      RESULT: [''],
      PROFESSIONAL_ETHICS: [''],
      BIGDATA: [''],
      CRYPTOGRAPHY: [''],
      GRAPHICS_AND_MULTIMEDIA: [''],
      BIGDATA_LAB: [''],
      GRAPHICS_AND_MULTIMEDIA_LAB: [''],
      BI_HSN: [''],
      BUSSINESS_HIGHSPEED: ['']
    });

  submitList() {
    this.userService.adminResults(this.ResultForm.value).subscribe((data) => {
      alert('Results Updated successfully');
      window.location.reload();
    });
  }

  deleteData(id: any) {
    if (confirm('Are you sure You want to delete this data')) {
      this.userService.deleteadminResults(id).subscribe((data) => {
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

  editAdminResult(id:any,register:any) {
    this.route.navigate(['/adminresultview',id,register]);
  }

  searchText: string = '';

  onSearchTextEntered(searchValue:string) {
    this.searchText = searchValue;
  }

  logOut() {
    this.auth.removeToken();
    this.route.navigate(['/login']);
    this.auth.logoutAdmin() == true;
  }

}
