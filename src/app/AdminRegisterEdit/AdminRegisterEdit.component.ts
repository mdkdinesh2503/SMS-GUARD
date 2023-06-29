import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UpdateService } from '../Update.service';

@Component({
  selector: 'app-AdminRegisterEdit',
  templateUrl: './AdminRegisterEdit.component.html',
  styleUrls: ['./AdminRegisterEdit.component.css'],
})
export class AdminRegisterEditComponent implements OnInit {
  constructor(
    private route: Router,
    private acRoute: ActivatedRoute,
    private service: LoginService,
    private updateService:UpdateService
  ) {}

  values: any;
  nameFromAdmin : any;
  getValueId : any;

  registerListFromStudent: any = '';

  userName: any;
  email: any;
  password: any;
  confirmPassword: any;

  ngOnInit() {
    this.acRoute.params.subscribe((params) => {
      this.values = params['id'];
    });

    this.acRoute.params.subscribe((params) => {
      this.nameFromAdmin = params['name'];
    });

    this.service.getRegisterDetails().subscribe((data) => {
      this.registerListFromStudent = data;

      for (var i = 0; i < this.registerListFromStudent.length; i++) {
        if (
          this.nameFromAdmin == this.registerListFromStudent[i].USERNAME
        ) {
          this.getValueId = i;
        }
      }

      this.userName = this.registerListFromStudent[this.getValueId].USERNAME;
      this.email = this.registerListFromStudent[this.getValueId].EMAIL;
      this.password = this.registerListFromStudent[this.getValueId].PASSWORD;
      this.confirmPassword = this.registerListFromStudent[this.getValueId].CONFIRMPASSWORD;
    });

  }

  goBack() {
    this.route.navigate(['/adminregisterlist']);
  }

  submitList(us:any,em:any,ps:any,cps:any) {

    var body = {
      USERNAME : us,
      EMAIL : em,
      PASSWORD : ps,
      CONFIRMPASSWORD : cps
    }

    this.updateService.updateRegisterData(body,this.values).subscribe((data) => {
      alert("Updated Successfully");
    });
  }
}
