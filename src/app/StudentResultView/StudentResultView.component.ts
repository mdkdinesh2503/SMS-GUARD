import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-StudentResultView',
  templateUrl: './StudentResultView.component.html',
  styleUrls: ['./StudentResultView.component.css'],
})
export class StudentResultViewComponent implements OnInit {
  constructor(
    private location: Location,
    private acRoute: ActivatedRoute,
    private service: LoginService
  ) {}

  regFromRes : any;
  getValueId : any;

  resultsFromAdmin: any = '';

  registerNumber: any;
  name: any;
  result: any;
  confirmPassword: any;
  professionals: any;
  bigData: any;
  crypto: any;
  graphicsMultimedia: any;
  bigDataLab: any;
  graphicsMultimediaLab: any;
  biHsn: any;
  bussinessHighspeed: any;

  ngOnInit() {

    this.acRoute.params.subscribe((params) => {
      this.regFromRes = params['register'];
    });

    this.service.getAdminResult().subscribe((data) => {
      this.resultsFromAdmin = data;

      for (var i = 0; i < this.resultsFromAdmin.length; i++) {
        if (
          this.regFromRes == this.resultsFromAdmin[i].REGISTER_NUMBER
        ) {
          this.getValueId = i;
        }
      }

      this.registerNumber =
        this.resultsFromAdmin[this.getValueId].REGISTER_NUMBER;
      this.name = this.resultsFromAdmin[this.getValueId].NAME;
      this.result = this.resultsFromAdmin[this.getValueId].RESULT;
      this.professionals =
        this.resultsFromAdmin[this.getValueId].PROFESSIONAL_ETHICS;
      this.bigData = this.resultsFromAdmin[this.getValueId].BIGDATA;
      this.crypto = this.resultsFromAdmin[this.getValueId].CRYPTOGRAPHY;
      this.graphicsMultimedia =
        this.resultsFromAdmin[this.getValueId].GRAPHICS_AND_MULTIMEDIA;
      this.bigDataLab = this.resultsFromAdmin[this.getValueId].BIGDATA_LAB;
      this.graphicsMultimediaLab =
        this.resultsFromAdmin[this.getValueId].GRAPHICS_AND_MULTIMEDIA_LAB;
      this.biHsn = this.resultsFromAdmin[this.getValueId].BI_HSN;
      this.bussinessHighspeed =
        this.resultsFromAdmin[this.getValueId].BUSSINESS_HIGHSPEED;
    });
  }

  goBack() {
    this.location.back();
  }

  printFunction() {
    window.print();
  }
}
