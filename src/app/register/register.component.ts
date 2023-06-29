import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { confirmPasswordValidator } from '../confirmpassword.validator';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  canExit():boolean {
    if(confirm("You are about to leave Register Page, Press Yes to Continue")) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.auth.removeToken();
  }

  registerReactiveForm = this.fb.group(
    {
      USERNAME: [, [Validators.required]],
      EMAIL: [, [Validators.required]],
      PASSWORD: [, [Validators.required]],
      CONFIRMPASSWORD: [, [Validators.required]],
    },
    {
      validator: confirmPasswordValidator('PASSWORD', 'CONFIRMPASSWORD'),
    }
  );

  submitList() {
    if (this.registerReactiveForm.controls['USERNAME'].errors?.['required']) {
      alert('Username is not Empty!!');
    } else if (this.registerReactiveForm.controls['EMAIL'].errors?.['required']) {
      alert('Email is not Empty!!');
    } else if (this.registerReactiveForm.controls['PASSWORD'].errors?.['required']) {
      alert('Password is not Empty!!');
    } else if (!this.registerReactiveForm.valid) {
      alert('Field must not contain any error');
    } else {
      this.userService
        .addRegisters(this.registerReactiveForm.value)
        .subscribe((data) => {
          alert('Registered Successfull');
          this.route.navigate(['/login']);
        });
    }
  }
}
