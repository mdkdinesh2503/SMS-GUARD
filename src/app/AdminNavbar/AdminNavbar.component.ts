import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-AdminNavbar',
  templateUrl: './AdminNavbar.component.html',
  styleUrls: ['./AdminNavbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private route:Router, private auth:AuthService) { }

  ngOnInit() {}

  openPage() {
    if(confirm('You are Redirect to home page') == true) {
      this.auth.removeToken();
      this.route.navigate(['/home']);
      this.auth.logoutAdmin() == true;
    }
  }

}
