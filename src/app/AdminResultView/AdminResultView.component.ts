import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UpdateService } from '../Update.service';

@Component({
  selector: 'app-AdminResultView',
  templateUrl: './AdminResultView.component.html',
  styleUrls: ['./AdminResultView.component.css'],
})
export class AdminResultViewComponent implements OnInit {
  constructor(
    private route: Router,
    private acRoute: ActivatedRoute,
    private service: LoginService,
    private updateService: UpdateService
  ) {}

  values: any;
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
      this.values = params['id'];
    });

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
    this.route.navigate(['/adminresults']);
  }

  submitList(
    registerNumberValue: any,
    nameValue: any,
    resultValue: any,
    professionalValue: any,
    bigDataValue: any,
    cryptoValue: any,
    graphicsValue: any,
    bigDataLabValue: any,
    graphicsLabValue: any,
    biHsnValue: any,
    bussinessHighspeedValue: any
  ) {
    var body = {
      REGISTER_NUMBER: registerNumberValue,
      NAME: nameValue,
      RESULT: resultValue,
      PROFESSIONAL_ETHICS: professionalValue,
      BIGDATA: bigDataValue,
      CRYPTOGRAPHY: cryptoValue,
      GRAPHICS_AND_MULTIMEDIA: graphicsValue,
      BIGDATA_LAB: bigDataLabValue,
      GRAPHICS_AND_MULTIMEDIA_LAB: graphicsLabValue,
      BI_HSN: biHsnValue,
      BUSSINESS_HIGHSPEED: bussinessHighspeedValue,
    };

    this.updateService.updateAdminResult(body, this.values).subscribe((data) => {
        alert('Updated Successfully');
      });
  }
}
