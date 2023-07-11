import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginService } from '../login.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-AdminReview',
  templateUrl: './AdminReview.component.html',
  styleUrls: ['./AdminReview.component.css']
})
export class AdminReviewComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private service:LoginService,
    private userService: UserService,
    private route: Router,
    private location: Location
    ) { }

    reviewFromStudent : any = '';

  ngOnInit() {
    this.service.getStudentReview().subscribe((data) => {
      this.reviewFromStudent = data;
    });
  }

  goBack() {
    this.location.back();
  }

  orderHeader :string = '';
  isDescOrder : boolean = true;

  sort(headerName:string) {
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
    this.auth.logoutAdmin() == true;
  }

  deleteData(id: any) {
    if (confirm('Are you sure You want to delete this data')) {
      this.userService.deleteStudentReview(id).subscribe((data) => {
        alert('Successfully deleted');
        window.location.reload();
      });
    }
  }

  viewStudentReview(id:any) {
    this.route.navigate(['/adminreviewopen', id]);
  }

  clickToConvert(filename:string, data:any) {
    this.auth.onExportClick(filename, data);
  }

}
