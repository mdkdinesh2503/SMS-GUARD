import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

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
