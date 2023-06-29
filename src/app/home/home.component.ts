import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.removeToken();
    this.checkNow();
  }

  PopupMsg: boolean = true;
  value: any = false;

  intervalID: any = setInterval(() => {
    this.closePopUp();
  }, 10000); //1sec = 1000 milli Seconds

  closePopUp() {
    clearInterval(this.intervalID);
    sessionStorage.setItem('PopUp', this.value);
    this.PopupMsg = this.auth.popUpAccess();
  }

  checkNow() {
    if (this.auth.popUpAccess() == true) {
      this.PopupMsg = this.auth.popUpAccess();
      this.intervalID;
    } else {
      this.closePopUp();
    }
  }
}
