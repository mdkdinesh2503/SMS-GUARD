import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor(private auth: AuthService, private service: LoginService) {
    this.displayDateAndTime;
  }

  // For Count Down Display
  countDownTimer: any;

  // For Quotes Display
  quotesFromDatabase: any;
  quoteData: any;
  authorData: any;

  //For PopUp Display
  PopupMsg: boolean = false;
  setTimeOutOpen: any;
  setTimeOutClose: any;

  //For Review Display
  reviewFromDatabase: any;
  stars: number[] = [];
  nonStars: number[] = [];

  generateStarSymbols(rating: any) {
    let myNumber = parseInt(rating);
    let decNumber = 5 - myNumber;
    this.stars = Array(myNumber).fill(0);
    this.nonStars = Array(decNumber).fill(0);
    return rating;
  }

  display: boolean = false;

  ngOnInit() {
    this.auth.removeToken();

    // this.openPopupTimeout();

    this.service.getStudentReview().subscribe(
      (data) => {
        this.reviewFromDatabase = data;
      },
      (error) => {
        this.auth.errorDisplay('HttpErrorResponse');
        this.display = true;
      }
    );

    this.service.getquotesDisplay().subscribe(
      (data) => {
        this.quotesFromDatabase = data;
        var randomNumber;

        this.quoteData = this.quotesFromDatabase[0].quote;
        this.authorData = this.quotesFromDatabase[0].author;

        setInterval(() => {
          randomNumber = Math.floor(Math.random() * 15) + 1;
          this.quoteData = this.quotesFromDatabase[randomNumber].quote;
          this.authorData = this.quotesFromDatabase[randomNumber].author;
        }, 7000); // no changes
      },
      (error) => {}
    );
  }

  displayDateAndTime: any = setInterval(() => {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var ap = '';

    if (hour >= 12) {
      ap = 'PM';
    } else {
      ap = 'AM';
    }

    if (hour > 12) {
      hour = hour - 12;
    }

    var currentDate = new Date().getTime();
    // End timer enable here for popup offer
    var endDate = new Date('Jun 20, 2023 06:26:0 PM').getTime();
    var duration = endDate - currentDate;

    if (duration < 0) {
      clearInterval(this.displayDateAndTime);
      this.PopupMsg = false;
      // Start timer enable here for popup offer
    } else if (
      hour == 6 &&
      minute >= 24 &&
      year == 2023 &&
      month == 6 &&
      ap == 'PM'
    ) {
      var days = Math.floor(duration / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((duration % (1000 * 60)) / 1000);

      this.countDownTimer =
        days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

      this.PopupMsg = true;
    }
  }, 1000);

  closePopUp() {
    this.PopupMsg = false;
    clearTimeout(this.setTimeOutOpen);
    clearTimeout(this.setTimeOutClose);
  }

  closePopupTimeout() {
    this.setTimeOutClose = setTimeout(() => {
      this.PopupMsg = false;
      this.openPopupTimeout();
    }, 14000); //1sec = 1000 milli Seconds
  }

  openPopupTimeout() {
    this.setTimeOutOpen = setTimeout(() => {
      this.PopupMsg = true;
      this.closePopupTimeout();
    }, 7000); //1sec = 1000 milli Seconds
  }
}
