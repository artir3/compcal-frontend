import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorFieldsMatcherService } from 'src/app/services/error-fields-matcher.service';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { Request } from 'selenium-webdriver/http';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../app.component.css']
})
export class LoginComponent implements OnInit {
  headers: any;
  options: any;
  email: FormControl;
  password: FormControl;
  error: string;

  constructor(
    private router: Router,
    public matcher: ErrorFieldsMatcherService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService) { }

  ngOnInit() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern("[a-zA-Z0-9.-]+\@[a-zA-Z0-9.-]+\.[a-z]+")
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(12),
      Validators.pattern("[a-zA-Z0-9!@$%^&-+=?]+")
    ]);
    this.auth.logout();
  }

  register() {
    this.router.navigateByUrl('registration');
  }

  login() {
    if (this.email.valid && this.password.valid) {
      let as = this.auth.login(this.email.value, this.password.value).pipe(first())
        .subscribe(
          islogged => {
            if (islogged) {
              this.router.navigateByUrl('/kpir/income');
            } else {
              this.error = "Wpisano niepoprawne dane.";
            }
          },
          error => {
            this.error = error;
          }
        );
    }
  }

}
