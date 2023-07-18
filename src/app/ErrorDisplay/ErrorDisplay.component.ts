import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ErrorDisplay',
  templateUrl: './ErrorDisplay.component.html',
  styleUrls: ['./ErrorDisplay.component.css']
})
export class ErrorDisplayComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit() {
  }

  message :any =this.auth.errorPage();

}
