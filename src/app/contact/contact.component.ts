import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.auth.removeToken();
  }

  popupLocation() {
    window.open(
      "https://www.google.com/maps/place/11%C2%B013'13.6%22N+78%C2%B009'42.1%22E/@11.22058,78.1615092,19z/data=!4m6!3m5!1s0!7e2!8m2!3d11.2204355!4d78.1616826",
      'Window',
      'status=1,toolbar=1'
    );
  }

  popupTime() {
    window.open(
      'https://www.google.com/search?q=current+time+with+seconds+in+india&rlz=1C1SQJL_enIN967IN967&ei=zgRJY7a1CMHZhwPS6q34Bg&ved=0ahUKEwi21Mnsjt_6AhXB7GEKHVJ1C28Q4dUDCA4&uact=5&oq=current+time+with+seconds+in+india&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBQgAEIYDMgUIABCGAzoKCAAQRxDWBBCwAzoHCAAQsAMQQ0oECEEYAEoECEYYAFCPBVirHWDLI2gBcAF4AIAB0gSIAYsXkgEJMi01LjMuMC4xmAEAoAEByAEKwAEB&sclient=gws-wiz',
      'Window',
      'status=1,toolbar=1'
    );
  }

  submitListContactForm(name: any, email: any, phone: any, msg: any) {
    if (name != '' && email != '' && phone != '' && msg != '') {
      alert('Message Send Successfully!!');
      window.location.reload();
    }
  }
}
