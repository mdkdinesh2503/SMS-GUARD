import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-AdminReviewView',
  templateUrl: './AdminReviewView.component.html',
  styleUrls: ['./AdminReviewView.component.css']
})
export class AdminReviewViewComponent implements OnInit {

  constructor(
    private route: Router,
    private acRoute: ActivatedRoute,
    private service: LoginService,
    private auth:AuthService
  ) { }

  studentRegisterNo: any;
  studentName: any;
  studentDepartment: any;
  studentRating: any;
  dates: any;
  times: any;
  message: any;

  reviewFromStudent: any = '';

  getValueId : any;
  register:any;

  ngOnInit() {
    this.acRoute.params.subscribe((params) => {
      this.register = params['id'];
    });

    this.service.getStudentReview().subscribe((data) => {
      this.reviewFromStudent = data;

      for (var i = 0; i < this.reviewFromStudent.length; i++) {
        if (
          this.register == this.reviewFromStudent[i].REGISTER_NUMBER
        ) {
          this.getValueId = i;
        }
      }

      this.studentRegisterNo = this.reviewFromStudent[this.getValueId].REGISTER_NUMBER;
      this.studentName = this.reviewFromStudent[this.getValueId].NAME;
      this.studentDepartment = this.reviewFromStudent[this.getValueId].DEPARTMENT;
      this.studentRating = this.reviewFromStudent[this.getValueId].RATING;
      this.dates = this.reviewFromStudent[this.getValueId].DATE;
      this.times = this.reviewFromStudent[this.getValueId].TIME;
      this.message = this.reviewFromStudent[this.getValueId].MESSAGE;
      });
  }

  goBack() {
    this.route.navigate(['/adminreview']);
  }

}
