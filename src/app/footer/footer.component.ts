import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit() {}

  emailReactiveForm = this.fb.group({
    EMAIL: [, [Validators.pattern]],
  });

  popupLocation() {
    window.open(
      "https://www.google.com/maps/place/11%C2%B013'13.6%22N+78%C2%B009'42.1%22E/@11.22058,78.1615092,19z/data=!4m6!3m5!1s0!7e2!8m2!3d11.2204355!4d78.1616826",
      'Window',
      'status=1,toolbar=1'
    );
  }

  submitUpdateList(email: any) {
    var body = {
      NEWS_MAIL: email,
    };
    if (email != '') {
      if (this.emailReactiveForm.valid) {
        this.userService.newsLetter(body).subscribe(
          (data) => {
            alert('You are Subscribed Successfully!!!');
            window.location.reload();
          },
          (error) => {}
        );
      } else {
        alert('Field is not Empty!!!');
      }
    }
  }
}
