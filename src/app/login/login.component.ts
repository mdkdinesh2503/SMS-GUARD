import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private service: LoginService,
    private route: Router,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private auth: AuthService
  ) {
    this.setNow();
  }

  aminLoginList: any = '';
  registersFromStudent: any = '';
  detailsFromDatabase: any;
  getValueId: any;
  idDisplay: any;
  getEmailFromRegister: any;
  emailValue: any;

  date: any = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
  time: string = '';
  hours: string = '';
  minutes: any = '';

  setNow() {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var ampm = '';

    if (hour >= 12) {
      ampm = 'PM';
    } else {
      ampm = 'AM';
    }

    if (hour > 12) {
      hour = hour - 12;
    }

    this.hours = '' + hour + '';

    if (this.hours.length == 1) {
      this.hours = '0' + hour + '';
    } else {
      this.hours = '' + hour + '';
    }

    this.minutes = '' + minute + '';

    if (this.minutes.length == 1) {
      this.minutes = '0' + minute + '';
    } else {
      this.minutes = '' + minute + '';
    }

    this.time = this.hours + ':' + this.minutes + ' ' + ampm;
  }

  display: boolean = false;

  ngOnInit() {
    this.auth.removeToken();

    this.service.getAdminListDetails().subscribe(
      (data) => {
        this.aminLoginList = data;
      },
      (error) => {
        this.auth.errorDisplay('HttpErrorResponse');
        this.display = true;
      }
    );

    this.service.getRegisterDetails().subscribe(
      (data) => {
        this.registersFromStudent = data;
      },
      (error) => {}
    );

    this.service.getStudentDetails().subscribe(
      (data) => {
        this.detailsFromDatabase = data;
      },
      (error) => {}
    );
  }

  mailPresent: boolean = false;

  forgotPass(email: any) {
    for (var i = 0; i < this.registersFromStudent.length; i++) {
      if (email == this.registersFromStudent[i].EMAIL) {
        this.getValueId = i;
      }
    }

    for (var i = 0; i < this.registersFromStudent.length; i++) {
      if (email == this.registersFromStudent[i].EMAIL) {
        this.mailPresent = true;
      }
    }

    if (this.mailPresent) {
      alert(
        'Your Password is : ' +
          this.registersFromStudent[this.getValueId].PASSWORD +
          '\n' +
          'Please note it down..'
      );
      window.location.reload();
    } else {
      alert('Please check your email, it does not exist in database');
    }
  }

  fieldTextType: boolean = false;

  showPass() {
    this.fieldTextType = !this.fieldTextType;
  }

  blur: boolean = false;

  openForgotPass() {
    this.blur = true;
  }

  openLoginPage() {
    this.blur = false;
  }

  LoginReactiveForm = this.fb.group({
    userNameValue: [, [Validators.required]],
    passwordValue: [, [Validators.required]],
  });

  studentUserNamePresent: boolean = false;
  adminUserNamePresent: boolean = false;

  signinList(un: any, ps: any) {
    for (var i = 0; i < this.registersFromStudent.length; i++) {
      if (
        un == this.registersFromStudent[i].USERNAME &&
        ps == this.registersFromStudent[i].PASSWORD
      ) {
        this.studentUserNamePresent = true;
      }
    }

    for (var i = 0; i < this.aminLoginList.length; i++) {
      if (
        un == this.aminLoginList[i].ADMINUSERNAME &&
        ps == this.aminLoginList[i].ADMINPASSWORD
      ) {
        this.adminUserNamePresent = true;
      }
    }

    if (this.studentUserNamePresent) {
      var body = {
        USERNAME: un,
        PASSWORD: ps,
        DATE: this.date,
        TIME: this.time,
      };

      this.userService.loginDetails(body).subscribe((data) => {
        if (confirm('You are Redirect to Student page') == true) {
          for (var i = 0; i < this.registersFromStudent.length; i++) {
            if (un == this.registersFromStudent[i].USERNAME) {
              this.getEmailFromRegister = this.registersFromStudent[i].EMAIL;
            }
          }

          for (var i = 0; i < this.detailsFromDatabase.length; i++) {
            if (
              this.getEmailFromRegister == this.detailsFromDatabase[i].EMAIL
            ) {
              this.idDisplay = i;
            }
          }

          this.auth.storeTokenId(this.idDisplay);

          this.auth.storeToken(un);
          this.auth.userLogin(un, ps).subscribe((data) => {
            this.route.navigate(['studentdashboard']);
          });
        }
      });
    } else if (this.adminUserNamePresent) {
      var body = {
        USERNAME: un,
        PASSWORD: ps,
        DATE: this.date,
        TIME: this.time,
      };

      this.userService.loginDetails(body).subscribe((data) => {
        if (confirm('You are Redirect to Admin page') == true) {
          this.auth.storeToken(un);
          this.auth.userLogin(un, ps).subscribe((data) => {
            this.route.navigate(['admindashboard']);
          });
        }
      });
    } else {
      alert('Username or Password is Incorrect!');
    }
  }

  forgotPasswordReactiveForm = this.fb.group({
    emailValue: [, [Validators.required]],
  });
}
