import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UpdateService } from '../Update.service';

@Component({
  selector: 'app-StudentProfile',
  templateUrl: './StudentProfile.component.html',
  styleUrls: ['./StudentProfile.component.css'],
})
export class StudentProfileComponent implements OnInit {
  constructor(
    private service: LoginService,
    private auth: AuthService,
    private route: Router,
    private location: Location,
    private updateService:UpdateService
  ) {}

  registerListFromStudent: any = '';

  userName: any;
  email: any;
  password: any;
  confirmPassword: any;
  getValueId: any;
  loginUser:any = this.auth.displayToken();

  ngOnInit() {

    this.service.getRegisterDetails().subscribe((data) => {
      this.registerListFromStudent = data;

      for (var i = 0; i < this.registerListFromStudent.length; i++) {
        if (
          this.loginUser == this.registerListFromStudent[i].USERNAME
        ) {
          this.getValueId = i;
        }
      }

      this.userName = this.registerListFromStudent[this.getValueId].USERNAME;
      this.email = this.registerListFromStudent[this.getValueId].EMAIL;
      this.password = this.registerListFromStudent[this.getValueId].PASSWORD;
      this.confirmPassword =
        this.registerListFromStudent[this.getValueId].CONFIRMPASSWORD;

    });
  }

  goBack() {
    this.location.back();
  }

  submitList(ps: any, cps: any) {
    var body = {
      USERNAME: this.userName,
      EMAIL: this.email,
      PASSWORD: ps,
      CONFIRMPASSWORD: cps,
    };

    this.updateService
      .updateRegisterData(body, this.getValueId+1)
      .subscribe((data) => {
        alert('Changed Password Successfully');
      });
  }
}
