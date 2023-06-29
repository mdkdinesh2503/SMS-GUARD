import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.auth.removeToken();
  }

  hideBox : boolean = false;
  hideButton : boolean = true;

  hideContainer() {
    this.hideBox = true;
    this.hideButton = false;
  }

}
