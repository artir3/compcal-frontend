import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorFieldsMatcherService } from 'src/app/services/error-fields-matcher.service';
import { UserRegister, DialogData } from 'src/app/models/models';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { InformationDialogComponent } from '../dialog/information-dialog/information-dialog.component';
import { invalid } from 'moment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css', '../../app.component.css']
})
export class RegistrationComponent implements OnInit {
  user: UserRegister;
  email: FormControl;
  name: FormControl;
  surname: FormControl;
  company: FormControl;
  nip: FormControl;
  street: FormControl;
  parcelNo: FormControl;
  zip: FormControl;
  city: FormControl;
  password: FormControl;
  homeNo: FormControl;
  repeatPassword: FormControl;
  taxForm: FormControl;

  constructor(
    private router: Router,
    public matcher: ErrorFieldsMatcherService,
    private userService: UserService,
    private dialog: MatDialog,
  ) { }

  register() {
    let isPassWalid = this.isPasswordsThisSame();
    if (isPassWalid && this.isValid()) {
      this.user = <UserRegister>{
        email: this.email.value,
        firstName: this.name.value,
        surname: this.surname.value,
        company: this.company.value,
        nip: this.nip.value,
        street: this.street.value,
        parcelNo: this.parcelNo.value,
        homeNo: this.homeNo.value,
        zip: this.zip.value,
        city: this.city.value,
        country: "Poland",
        password: this.password.value,
        taxForm: this.taxForm.value
      }
      this.userService.registration(this.user).subscribe(data => {
        if (data) {
          this.isRegistred();
        } else this.isNoRegistred();
      });
    } else this.invalids();
  }

  invalids() {
    let dialogData: DialogData = {
      title: "Niepoprawne dane",
      context: "Nie możemy kontynuowć ze względu na niepoprawne dane. Proszę poprawić wprowadzone dane.",
    };
    let dialogRef = this.dialog.open(InformationDialogComponent, { data: dialogData });
    dialogRef.afterClosed();
  }

  private isNoRegistred() {
    let dialogData: DialogData = {
      title: "Nie zarejestrowany",
      context: "Niezmiernie nam przykro, ale nie zostałeś zarejestrowany, prosimy spróbować ponownie.",
    };
    let dialogRef = this.dialog.open(InformationDialogComponent, { data: dialogData });
    dialogRef.afterClosed();
  }

  private isRegistred() {
    let dialogData: DialogData = {
      title: "Gratulacje",
      context: "Zostałeś pomyślnie zarejestrowany, w celu dokończenia, proszę kliknąć w link aktywacujny wysłany na wcześniej podany email.",
    };
    let dialogRef = this.dialog.open(InformationDialogComponent, { data: dialogData });
    dialogRef.afterClosed().subscribe(subscribe => this.back());
  }

  isPasswordsThisSame(){
    if (this.password.value !== this.repeatPassword.value) {
      this.password.setValue(null);
      this.repeatPassword.setValue(null);
      let dialogData: DialogData = {
        title: "Hasła nie pasują",
        context: "Hasło i powtórzone hasło nie pasują do siebie. Proszę wpisać poprawane dane.",
      };
      let dialogRef = this.dialog.open(InformationDialogComponent, { data: dialogData });
      dialogRef.close();
      return false;
    }
    return true;
  }

  isValid() {
    return this.email.valid && this.name.valid && this.surname.valid && this.company.valid && this.nip.valid &&
      this.street.valid && this.parcelNo.valid && this.homeNo.valid && this.zip.valid && this.city.valid &&
      this.password.valid && this.taxForm.valid;
  }

  ngOnInit() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern("[a-zA-Z0-9.-]+\@[a-zA-Z0-9.-]+\.[a-z]+")
    ]);

    this.name = new FormControl('', [
      Validators.required,
      Validators.maxLength(15)
    ]);

    this.surname = new FormControl('', [
      Validators.required,
      Validators.maxLength(15)
    ]);

    this.company = new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]);

    this.nip = new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]);

    this.street = new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]);

    this.parcelNo = new FormControl('', [
      Validators.required,
      Validators.maxLength(5)
    ]);

    this.homeNo = new FormControl('', [
      Validators.maxLength(5)
    ]);

    this.zip = new FormControl('', [
      Validators.required,
      Validators.maxLength(6),
      Validators.minLength(6),
      Validators.pattern("[0-9]{2}-[0-9]{3}")
    ]);

    this.city = new FormControl('', [
      Validators.required,
      Validators.maxLength(15)
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.nullValidator,
      Validators.minLength(5),
      Validators.maxLength(12),
      Validators.pattern("[a-zA-Z0-9!@$%^&-+=?]+")
    ]);

    this.repeatPassword = new FormControl('', [
      Validators.required,
      Validators.nullValidator,
      Validators.minLength(5),
      Validators.maxLength(12),
      Validators.pattern("[a-zA-Z0-9!@$%^&-+=?]+")
    ]);

    this.taxForm = new FormControl('', [
      Validators.required,
    ]);
  }

  back() {
    this.router.navigateByUrl('/');
  }
}