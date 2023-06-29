import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-StudentNavbar',
  templateUrl: './StudentNavbar.component.html',
  styleUrls: ['./StudentNavbar.component.css']
})
export class StudentNavbarComponent implements OnInit {

  constructor(private route:Router,private auth:AuthService) { }

  ngOnInit() {
  }

  openPage() {
    if(confirm('You are Redirect to home page') == true) {
      this.auth.removeToken();
      this.route.navigate(['/home']);
      this.auth.logoutUser() == true;
    }
  }

}
