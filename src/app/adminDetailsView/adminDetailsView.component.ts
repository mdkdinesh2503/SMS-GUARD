import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UpdateService } from '../Update.service';

@Component({
  selector: 'app-AdminDetailsView',
  templateUrl: './AdminDetailsView.component.html',
  styleUrls: ['./AdminDetailsView.component.css'],
})
export class AdminDetailsViewComponent implements OnInit {
  constructor(
    private route: Router,
    private acRoute: ActivatedRoute,
    private service: LoginService,
    private updateService: UpdateService
  ) {}

  values: any;
  regFromDet : any;
  getValueId : any;

  detailsFromStudent: any = '';

  names: any;
  dobs: any;
  emls: any;
  mbls: any;
  gndrs: any;
  marstas: any;
  ages: any;
  cmtys: any;
  cstes: any;
  addtys: any;
  artys: any;
  ctrys: any;
  appnos: any;
  adr1s: any;
  adr2s: any;
  citys: any;
  pncds: any;
  states: any;
  ttlmens: any;
  firgrds: any;
  incs: any;
  fthrnas: any;
  fthrocs: any;
  fthrmos: any;
  mthrnas: any;
  mthrocs: any;
  mthrmos: any;
  rgtrs: any;
  degrs: any;
  deprts: any;
  clgnas: any;
  yrpsss: any;
  yrstus: any;
  mtens: any;
  mtenmos: any;
  mtenttls: any;
  mtws: any;
  mtwmos: any;
  mtwttls: any;

  ngOnInit() {
    this.acRoute.params.subscribe((params) => {
      this.values = params['id'];
    });

    this.acRoute.params.subscribe((params) => {
      this.regFromDet = params['register'];
    });

    this.service.getStudentDetails().subscribe((data) => {
      this.detailsFromStudent = data;

      for (var i = 0; i < this.detailsFromStudent.length; i++) {
        if (
          this.regFromDet == this.detailsFromStudent[i].REGISTER_NUMBER
        ) {
          this.getValueId = i;
        }
      }

      this.names = this.detailsFromStudent[this.getValueId].NAME;
      this.dobs = this.detailsFromStudent[this.getValueId].DATE_OF_BIRTH;
      this.emls = this.detailsFromStudent[this.getValueId].EMAIL;
      this.mbls = this.detailsFromStudent[this.getValueId].MOBILE_NUMBER;
      this.gndrs = this.detailsFromStudent[this.getValueId].GENDER;
      this.marstas = this.detailsFromStudent[this.getValueId].MARITAL_STATUS;
      this.ages = this.detailsFromStudent[this.getValueId].AGE;
      this.cmtys = this.detailsFromStudent[this.getValueId].COMMUNITY;
      this.cstes = this.detailsFromStudent[this.getValueId].CASTE;
      this.addtys = this.detailsFromStudent[this.getValueId].ADDRESS_TYPE;
      this.artys = this.detailsFromStudent[this.getValueId].AREA_TYPE;
      this.ctrys = this.detailsFromStudent[this.getValueId].COUNTRY;
      this.appnos = this.detailsFromStudent[this.getValueId].APPARTMENT_NUMBER;
      this.adr1s = this.detailsFromStudent[this.getValueId].ADDRESS_LINE_1;
      this.adr2s = this.detailsFromStudent[this.getValueId].ADDRESS_LINE_2;
      this.citys = this.detailsFromStudent[this.getValueId].CITY;
      this.pncds = this.detailsFromStudent[this.getValueId].PINCODE;
      this.states = this.detailsFromStudent[this.getValueId].STATE;
      this.ttlmens =
        this.detailsFromStudent[this.getValueId].TOTAL_FAMILY_MEMBERS;
      this.firgrds = this.detailsFromStudent[this.getValueId].FIRST_GRADUATE;
      this.incs = this.detailsFromStudent[this.getValueId].TOTAL_INCOME;
      this.fthrnas = this.detailsFromStudent[this.getValueId].FATHER_NAME;
      this.fthrocs = this.detailsFromStudent[this.getValueId].FATHER_OCCUPATION;
      this.fthrmos =
        this.detailsFromStudent[this.getValueId].FATHER_MOBILE_NUMBER;
      this.mthrnas = this.detailsFromStudent[this.getValueId].MOTHER_NAME;
      this.mthrocs = this.detailsFromStudent[this.getValueId].MOTHER_OCCUPATION;
      this.mthrmos =
        this.detailsFromStudent[this.getValueId].MOTHER_MOBILE_NUMBER;
      this.rgtrs = this.detailsFromStudent[this.getValueId].REGISTER_NUMBER;
      this.degrs = this.detailsFromStudent[this.getValueId].STUDENT_DEGREE;
      this.deprts = this.detailsFromStudent[this.getValueId].STUDENT_DEPARTMENT;
      this.clgnas =
        this.detailsFromStudent[this.getValueId].STUDENT_COLLEGE_NAME;
      this.yrpsss = this.detailsFromStudent[this.getValueId].YEAR_OF_PASSING;
      this.yrstus = this.detailsFromStudent[this.getValueId].YEAR_OF_STUDING;
      this.mtens = this.detailsFromStudent[this.getValueId].TENTH_MARK;
      this.mtenmos = this.detailsFromStudent[this.getValueId].TENTH_STUDY_MODE;
      this.mtenttls = this.detailsFromStudent[this.getValueId].TENTH_TOTAL_MARK;
      this.mtws = this.detailsFromStudent[this.getValueId].TWELTH_MARK;
      this.mtwmos = this.detailsFromStudent[this.getValueId].TWELTH_STUDY_MODE;
      this.mtwttls = this.detailsFromStudent[this.getValueId].TWELTH_TOTAL_MARK;
    });

  }

  goBack() {
    this.route.navigate(['/admindetails']);
  }

  submitList(
    name: any,
    dob: any,
    eml: any,
    mbl: any,
    gndr: any,
    marsta: any,
    age: any,
    cmty: any,
    cste: any,
    addty: any,
    arty: any,
    ctry: any,
    appno: any,
    adr1: any,
    adr2: any,
    city: any,
    pncd: any,
    state: any,
    ttlmen: any,
    firgrd: any,
    inc: any,
    fthrna: any,
    fthroc: any,
    fthrmo: any,
    mthrna: any,
    mthroc: any,
    mthrmo: any,
    rgtr: any,
    degr: any,
    deprt: any,
    clgna: any,
    yrpss: any,
    yrstu: any,
    mten: any,
    mtenmo: any,
    mtenttl: any,
    mtw: any,
    mtwmo: any,
    mtwttl: any
  ) {

    var body = {
      NAME: name,
      DATE_OF_BIRTH: dob,
      EMAIL: eml,
      MOBILE_NUMBER: mbl,
      GENDER: gndr,
      MARITAL_STATUS: marsta,
      AGE: age,
      COMMUNITY: cmty,
      CASTE: cste,
      ADDRESS_TYPE: addty,
      AREA_TYPE: arty,
      COUNTRY: ctry,
      APPARTMENT_NUMBER: appno,
      ADDRESS_LINE_1: adr1,
      ADDRESS_LINE_2: adr2,
      CITY: city,
      PINCODE: pncd,
      STATE: state,
      TOTAL_FAMILY_MEMBERS: ttlmen,
      FIRST_GRADUATE: firgrd,
      TOTAL_INCOME: inc,
      FATHER_NAME: fthrna,
      FATHER_OCCUPATION: fthroc,
      FATHER_MOBILE_NUMBER: fthrmo,
      MOTHER_NAME: mthrna,
      MOTHER_OCCUPATION: mthroc,
      MOTHER_MOBILE_NUMBER: mthrmo,
      REGISTER_NUMBER: rgtr,
      STUDENT_DEGREE: degr,
      STUDENT_DEPARTMENT: deprt,
      STUDENT_COLLEGE_NAME: clgna,
      YEAR_OF_PASSING: yrpss,
      YEAR_OF_STUDING: yrstu,
      TENTH_MARK: mten,
      TENTH_STUDY_MODE: mtenmo,
      TENTH_TOTAL_MARK: mtenttl,
      TWELTH_MARK: mtw,
      TWELTH_STUDY_MODE: mtwmo,
      TWELTH_TOTAL_MARK: mtwttl,
    };

    this.updateService.updateAdminData(body, this.values).subscribe((data) => {
      alert('Updated Successfully');
    });

  }
}
