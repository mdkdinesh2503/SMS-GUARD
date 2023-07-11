import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-StudentTimetable',
  templateUrl: './StudentTimetable.component.html',
  styleUrls: ['./StudentTimetable.component.css'],
})
export class StudentTimetableComponent implements OnInit {
  constructor(
    private location: Location,
    private service: LoginService,
    private auth: AuthService,
    private route:Router
  ) {}

  timetableFromAdmin: any = '';
  loginUserName: any = this.auth.displayToken();

  ngOnInit() {
    this.service.getAdminTimetable().subscribe((data) => {
      this.timetableFromAdmin = data;
    });
  }

  goBack() {
    this.location.back();
  }

  logOut() {
    this.auth.removeToken();
    this.route.navigate(['/login']);
    this.auth.logoutUser() == true;
  }

  clickToConvert(filename:string, data:any) {
    this.auth.onExportClick(filename, data);
  }
}
