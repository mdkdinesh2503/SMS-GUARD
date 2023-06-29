import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-StudentExamPayment',
  templateUrl: './StudentExamPayment.component.html',
  styleUrls: ['./StudentExamPayment.component.css'],
})
export class StudentExamPaymentComponent implements OnInit {
  constructor(
    private location: Location,
    private route: Router,
    private userService: UserService,
    private acRoute: ActivatedRoute,
    private service: LoginService
  ) {}

  detailsFromStudent: any;
  getValueId: any;

  studentRegisterNo: any;
  studentName: any;
  studentEmail: any;
  studentPhoneNo: any;
  studentCollegeName: any;
  studentDegree: any;
  studentDepartment: any;
  studentTotalAmount = '2600';

  ngOnInit() {

    this.acRoute.params.subscribe((params) => {
      this.studentRegisterNo = params['registerNumber'];
    });

    this.service.getStudentDetails().subscribe((data) => {
      this.detailsFromStudent = data;
      for (var i = 0; i < this.detailsFromStudent.length; i++) {
        if (
          this.studentRegisterNo == this.detailsFromStudent[i].REGISTER_NUMBER
        ) {
          this.getValueId = i;
        }
      }

      this.getValueId = this.getValueId;
      this.studentName = this.detailsFromStudent[this.getValueId].NAME;
      this.studentEmail = this.detailsFromStudent[this.getValueId].EMAIL;
      this.studentPhoneNo =
        this.detailsFromStudent[this.getValueId].MOBILE_NUMBER;
      this.studentCollegeName =
        this.detailsFromStudent[this.getValueId].STUDENT_COLLEGE_NAME;
      this.studentDegree =
        this.detailsFromStudent[this.getValueId].STUDENT_DEGREE;
      this.studentDepartment =
        this.detailsFromStudent[this.getValueId].STUDENT_DEPARTMENT;
    });
  }

  goBack() {
    this.location.back();
  }

  paymentExam(cardNumber: any, month: any, cvv: any) {
    var body = {
      REGISTER_NUMBER: this.studentRegisterNo,
      NAME: this.studentName,
      FEES: 'Paided',
      DEGREE: this.studentDegree,
      DEPARTMENT: this.studentDepartment,
      TOTAL_AMOUNT: this.studentTotalAmount,
    };
    if (cardNumber != '' && month != '' && cvv != '') {
      this.userService.studentExamFeesPayment(body).subscribe((data) => {
        alert('Fees Paided Successfully');
        this.route.navigate(['/studentexam']);
      });
    } else {
      alert('Field is Not Empty!!');
    }
  }
}
