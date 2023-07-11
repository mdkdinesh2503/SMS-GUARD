import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as xlsx from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  storeToken(token: string) {
    sessionStorage.setItem('USERNAME', token);
    return token;
  }

  storeTokenId(token: string) {
    sessionStorage.setItem('ID', token);
  }

  displayToken() {
    return sessionStorage.getItem('USERNAME');
  }

  displayIdToken() {
    return sessionStorage.getItem('ID');
  }

  removeToken() {
    sessionStorage.removeItem('USERNAME');
    sessionStorage.removeItem('ID');
  }

  popUpAccess() : boolean {
    if (
      sessionStorage.getItem('PopUp') != null &&
      sessionStorage.getItem('PopUp') == 'true'
    ) {
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn:boolean = true;
  isAdminLoggedIn:boolean = true;
  userName:any;
  password:any;

  userLogin(username:any, password:any) {
    this.userName = username;
    this.password = password;
    this.isUserLoggedIn = false;
    return of(this.isUserLoggedIn);
  }

  isUserLogin():boolean {
    return this.isUserLoggedIn;
  }

  logoutUser():any {
    this.isUserLoggedIn = true;
  }

  adminLogin(username:any, password:any) {
    this.userName = username;
    this.password = password;
    this.isAdminLoggedIn = false;
    return of(this.isAdminLoggedIn);
  }

  isAdminLogin():boolean {
    return this.isAdminLoggedIn;
  }

  logoutAdmin():any {
    this.isAdminLoggedIn = true;
  }

  onExportClick(fileName:String, data:any):void {
    const workSheet: xlsx.WorkSheet = xlsx.utils.table_to_sheet(data);
    const workBook: xlsx.WorkBook = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
    xlsx.writeFile(workBook, fileName+'.xlsx');
  }

}
