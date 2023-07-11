import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-AdminExam',
  templateUrl: './AdminExam.component.html',
  styleUrls: ['./AdminExam.component.css'],
})
export class AdminExamComponent implements OnInit {
  constructor(
    private location: Location,
    private userService: UserService,
    private service: LoginService,
    private auth: AuthService,
    private route: Router
  ) {}

  hallAllocationFromAdmin: any;
  timetableFromAdmin: any;
  examFeesFromStudent: any;

  ngOnInit() {
    this.service.getAdminExamHallAllocation().subscribe((data) => {
      this.hallAllocationFromAdmin = data;
    });

    this.service.getAdminExamTimetable().subscribe((data) => {
      this.timetableFromAdmin = data;
    });

    this.service.getStudentExamFeesPayment().subscribe((data) => {
      this.examFeesFromStudent = data;
    });
  }

  goBack() {
    this.location.back();
  }

  submitListHallAllocation(
    year: any,
    sem: any,
    course: any,
    hallNumber: any,
    totalStudent: any
  ) {
    var body = {
      YEAR: year,
      SEMESTER: sem,
      COURSES: course,
      HALL_NUMBER: hallNumber,
      TOTAL_STUDENTS: totalStudent,
    };

    if (
      year != '' &&
      sem != '' &&
      course != '' &&
      hallNumber != '' &&
      totalStudent != ''
    ) {
      this.userService.adminExamHallAllocation(body).subscribe((data) => {
        alert('Exam Hall Allocation added successfully');
        window.location.reload();
      });
    } else {
      alert('Fields does not Empty!!');
    }
  }

  submitListTimetable(
    subject: any,
    exam1: any,
    exam2: any,
    exam3: any,
    exam4: any,
    exam5: any,
    exam6: any
  ) {
    var body = {
      SUBJECT: subject,
      FIRST_EXAM: exam1,
      SECOND_EXAM: exam2,
      THIRD_EXAM: exam3,
      FOURTH_EXAM: exam4,
      FIFTH_EXAM: exam5,
      SIXTH_EXAM: exam6,
    };

    if (
      subject != '' &&
      exam1 != '' &&
      exam2 != '' &&
      exam3 != '' &&
      exam4 != '' &&
      exam5 != '' &&
      exam6 != ''
    ) {
      this.userService.adminExamTimetable(body).subscribe((data) => {
        alert('Exam Timetable added successfully');
        window.location.reload();
      });
    } else {
      alert('Fields does not Empty!!');
    }
  }

  orderHeader: string = '';
  isDescOrder: boolean = true;

  sort(headerName: string) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }

  hide1: boolean = true;
  hide2: boolean = false;
  hide3: boolean = false;
  hide4: boolean = false;

  openExamHallAllocation() {
    this.hide1 = true;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
  }

  openExamTimetable() {
    this.hide1 = false;
    this.hide2 = true;
    this.hide3 = false;
    this.hide4 = false;
  }

  openExamPayment() {
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = true;
    this.hide4 = false;
  }

  openDeleteContainer() {
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = true;
  }

  searchText: string = '';

  onSearchTextEntered(searchValue: string) {
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
