import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-StudentDetails',
  templateUrl: './StudentDetails.component.html',
  styleUrls: ['./StudentDetails.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  constructor(
    private location: Location,
    private route: Router,
    private userService: UserService,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  goBack() {
    this.location.back();
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

    if (
      name != '' &&
      dob != '' &&
      eml != '' &&
      mbl != '' &&
      gndr != '' &&
      marsta != '' &&
      age != '' &&
      cmty != '' &&
      cste != '' &&
      addty != '' &&
      arty != '' &&
      ctry != '' &&
      appno != '' &&
      adr1 != '' &&
      adr2 != '' &&
      city != '' &&
      pncd != '' &&
      state != '' &&
      ttlmen != '' &&
      firgrd != '' &&
      inc != '' &&
      fthrna != '' &&
      fthroc != '' &&
      fthrmo != '' &&
      mthrna != '' &&
      mthroc != '' &&
      mthrmo != '' &&
      rgtr != '' &&
      degr != '' &&
      deprt != '' &&
      clgna != '' &&
      yrpss != '' &&
      yrstu != '' &&
      mten != '' &&
      mtenmo != '' &&
      mtenttl != '' &&
      mtw != '' &&
      mtwmo != '' &&
      mtwttl != ''
    ) {
      this.userService.studentDetails(body).subscribe((data) => {
        alert('Student Details Submitted successfully');
        window.location.reload();
      });
    } else {
      alert('Field Does not Empty!!');
    }
  }

  printScreen() {
    window.print();
  }

  logOut() {
    this.auth.removeToken();
    this.route.navigate(['/login']);
    this.auth.logoutUser() == true;
  }

}
