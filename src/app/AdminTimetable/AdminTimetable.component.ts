import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    private route: Router,
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

  AdmintimetableForm = this.fb.group({
    YEAR: ['', [Validators.required]],
    DEPARTMENT: ['', [Validators.required]],
    MONDAY1ST: ['', [Validators.required]],
    MONDAY2ND: ['', [Validators.required]],
    MONDAY3RD: ['', [Validators.required]],
    MONDAY4TH: ['', [Validators.required]],
    MONDAY5TH: ['', [Validators.required]],
    MONDAY6TH: ['', [Validators.required]],
    MONDAY7TH: ['', [Validators.required]],
    TUESDAY1ST: ['', [Validators.required]],
    TUESDAY2ND: ['', [Validators.required]],
    TUESDAY3RD: ['', [Validators.required]],
    TUESDAY4TH: ['', [Validators.required]],
    TUESDAY5TH: ['', [Validators.required]],
    TUESDAY6TH: ['', [Validators.required]],
    TUESDAY7TH: ['', [Validators.required]],
    WEDNESDAY1ST: ['', [Validators.required]],
    WEDNESDAY2ND: ['', [Validators.required]],
    WEDNESDAY3RD: ['', [Validators.required]],
    WEDNESDAY4TH: ['', [Validators.required]],
    WEDNESDAY5TH: ['', [Validators.required]],
    WEDNESDAY6TH: ['', [Validators.required]],
    WEDNESDAY7TH: ['', [Validators.required]],
    THURSDAY1ST: ['', [Validators.required]],
    THURSDAY2ND: ['', [Validators.required]],
    THURSDAY3RD: ['', [Validators.required]],
    THURSDAY4TH: ['', [Validators.required]],
    THURSDAY5TH: ['', [Validators.required]],
    THURSDAY6TH: ['', [Validators.required]],
    THURSDAY7TH: ['', [Validators.required]],
    FRIDAY1ST: ['', [Validators.required]],
    FRIDAY2ND: ['', [Validators.required]],
    FRIDAY3RD: ['', [Validators.required]],
    FRIDAY4TH: ['', [Validators.required]],
    FRIDAY5TH: ['', [Validators.required]],
    FRIDAY6TH: ['', [Validators.required]],
    FRIDAY7TH: ['', [Validators.required]],
  });

  submitTimetableForm() {
    if (
      this.AdmintimetableForm.controls['YEAR'].errors?.['required'] &&
      this.AdmintimetableForm.controls['DEPARTMENT'].errors?.['required'] &&
      this.AdmintimetableForm.controls['MONDAY1ST'].errors?.['required'] &&
      this.AdmintimetableForm.controls['MONDAY2ND'].errors?.['required'] &&
      this.AdmintimetableForm.controls['MONDAY3RD'].errors?.['required'] &&
      this.AdmintimetableForm.controls['MONDAY4TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['MONDAY5TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['MONDAY6TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['MONDAY7TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['TUESDAY1ST'].errors?.['required'] &&
      this.AdmintimetableForm.controls['TUESDAY2ND'].errors?.['required'] &&
      this.AdmintimetableForm.controls['TUESDAY3RD'].errors?.['required'] &&
      this.AdmintimetableForm.controls['TUESDAY4TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['TUESDAY5TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['TUESDAY6TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['TUESDAY7TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['WEDNESDAY1ST'].errors?.['required'] &&
      this.AdmintimetableForm.controls['WEDNESDAY2ND'].errors?.['required'] &&
      this.AdmintimetableForm.controls['WEDNESDAY3RD'].errors?.['required'] &&
      this.AdmintimetableForm.controls['WEDNESDAY4TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['WEDNESDAY5TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['WEDNESDAY6TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['WEDNESDAY7TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['THURSDAY1ST'].errors?.['required'] &&
      this.AdmintimetableForm.controls['THURSDAY2ND'].errors?.['required'] &&
      this.AdmintimetableForm.controls['THURSDAY3RD'].errors?.['required'] &&
      this.AdmintimetableForm.controls['THURSDAY4TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['THURSDAY5TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['THURSDAY6TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['THURSDAY7TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['FRIDAY1ST'].errors?.['required'] &&
      this.AdmintimetableForm.controls['FRIDAY2ND'].errors?.['required'] &&
      this.AdmintimetableForm.controls['FRIDAY3RD'].errors?.['required'] &&
      this.AdmintimetableForm.controls['FRIDAY4TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['FRIDAY5TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['FRIDAY6TH'].errors?.['required'] &&
      this.AdmintimetableForm.controls['FRIDAY7TH'].errors?.['required']
    ) {
      alert('Fields are not Empty!!');
    } else {
      this.userService
        .adminTimetable(this.AdmintimetableForm.value)
        .subscribe((data) => {
          alert('Timetable Updated successfully');
          window.location.reload();
        });
    }
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

  clickToConvert(filename:string, data:any) {
    this.auth.onExportClick(filename, data);
  }
}
