import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-AdminRegisterList',
  templateUrl: './AdminRegisterList.component.html',
  styleUrls: ['./AdminRegisterList.component.css'],
})
export class AdminRegisterListComponent implements OnInit {
  constructor(
    private location: Location,
    private service: LoginService,
    private userService: UserService,
    private auth: AuthService,
    private route:Router
  ) {}

  registerListFromStudent: any = '';

  ngOnInit() {
    this.service.getRegisterDetails().subscribe((data) => {
      this.registerListFromStudent = data;
    });
  }

  goBack() {
    this.location.back();
  }

  deleteData(id: any) {
    if (confirm('Are you sure You want to delete this data')) {
      this.userService.deleteUserData(id).subscribe((data) => {
        alert('Successfully deleted');
        window.location.reload();
      });
    }
  }

  orderHeader :string = '';
  isDescOrder : boolean = true;

  sort(headerName:string) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }

  editRegister(id:any, name:any) {
    this.route.navigate(['/adminregisteredit', id, name]);
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
