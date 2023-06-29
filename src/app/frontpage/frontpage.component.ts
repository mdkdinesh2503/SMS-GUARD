import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.auth.removeToken();
    sessionStorage.setItem('PopUp', this.value);
  }

  value:any=true;

}
