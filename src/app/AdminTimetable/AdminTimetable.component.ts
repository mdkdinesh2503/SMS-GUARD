import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-AdminTimetable',
  templateUrl: './AdminTimetable.component.html',
  styleUrls: ['./AdminTimetable.component.css'],
})
export class AdminTimetableComponent implements OnInit {
  constructor(
    private location: Location,
    private userService: UserService,
    private auth: AuthService,
    private route:Router,
    private service: LoginService,
    private fb: FormBuilder
  ) {}

  timetableFromAdmin: any = '';

  ngOnInit() {
    this.service.getAdminTimetable().subscribe((data) => {
      this.timetableFromAdmin = data;
    });
  }

  goBack() {
    this.location.back();
  }

  AdmintimetableForm = this.fb.group(
    {
      YEAR: [''],
      DEPARTMENT: [''],
      MONDAY1ST: [''],
      MONDAY2ND: [''],
      MONDAY3RD: [''],
      MONDAY4TH: [''],
      MONDAY5TH: [''],
      MONDAY6TH: [''],
      MONDAY7TH: [''],
      TUESDAY1ST: [''],
      TUESDAY2ND: [''],
      TUESDAY3RD: [''],
      TUESDAY4TH: [''],
      TUESDAY5TH: [''],
      TUESDAY6TH: [''],
      TUESDAY7TH: [''],
      WEDNESDAY1ST: [''],
      WEDNESDAY2ND: [''],
      WEDNESDAY3RD: [''],
      WEDNESDAY4TH: [''],
      WEDNESDAY5TH: [''],
      WEDNESDAY6TH: [''],
      WEDNESDAY7TH: [''],
      THURSDAY1ST: [''],
      THURSDAY2ND: [''],
      THURSDAY3RD: [''],
      THURSDAY4TH: [''],
      THURSDAY5TH: [''],
      THURSDAY6TH: [''],
      THURSDAY7TH: [''],
      FRIDAY1ST: [''],
      FRIDAY2ND: [''],
      FRIDAY3RD: [''],
      FRIDAY4TH: [''],
      FRIDAY5TH: [''],
      FRIDAY6TH: [''],
      FRIDAY7TH: ['']
    });

  submitTimetableForm() {

    this.userService.adminTimetable(this.AdmintimetableForm.value).subscribe((data) => {
      alert('Timetable Updated successfully');
      window.location.reload();
    });
  }

  deleteData(id: any) {
    if (confirm('Are you sure You want to delete this data')) {
      this.userService.deleteAdminTimetable(id).subscribe((data) => {
        alert('Successfully deleted');
        window.location.reload();
      });
    }
  }

  logOut() {
    this.auth.removeToken();
    this.route.navigate(['/login']);
    this.auth.logoutAdmin() == true;
  }

}
