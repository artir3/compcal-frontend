import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { BankAccount, User, DialogData, YesNoDialogData } from 'src/app/models/models';
import { UserService } from 'src/app/services/user.service';
import { ErrorFieldsMatcherService } from 'src/app/services/error-fields-matcher.service';
import { TaxForm } from 'src/app/models/enums';
import { first } from 'rxjs/operators';
import { InformationDialogComponent } from '../dialog/information-dialog/information-dialog.component';
import { MatDialog, MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AccountDialogComponent } from '../dialog/account-dialog/account-dialog.component';
import { isNullOrUndefined } from 'util';
import { BankAccountDataSource } from 'src/app/datasource/bank-account-datasource';
import { YesNoDialog } from '../dialog/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', '../../app.component.css']
})
export class SettingsComponent {
  user: User;
  id: number;
  email: FormControl;
  firstName: FormControl;
  surname: FormControl;
  company: FormControl;
  nip: FormControl;
  street: FormControl;
  parcelNo: FormControl;
  zip: FormControl;
  city: FormControl;
  country: FormControl;
  pkd: FormControl;
  regon: FormControl;
  password: FormControl;
  homeNo: FormControl;
  repeatPassword: FormControl;
  taxForm: FormControl;
  displayedColumns: string[];
  bankAccountDataSource: BankAccountDataSource;
  bankAccounts: BankAccount[];
  checkPassword: boolean = true;

  constructor(
    public matcher: ErrorFieldsMatcherService,
    private userService: UserService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
    this.displayedColumns = ["accountNo", "currency", "swift", "actions"];
  }

  save() {
    this.user = <User>{
      id: this.id,
      email: this.email.value,
      firstName: this.firstName.value,
      company: this.company.value,
      nip: this.nip.value,
      surname: this.surname.value,
      street: this.street.value,
      parcelNo: this.parcelNo.value,
      homeNo: this.homeNo.value,
      zip: this.zip.value,
      city: this.city.value,
      taxForm: this.taxForm.value,
      pkd: this.pkd.value,
      regon: this.regon.value,
      country: this.country.value,
      bankAccountSet: this.bankAccounts,
    }
    this.isPasswordsThisSame();
    if (this.checkPassword && this.isValid()) {
      this.userService.update(this.user).pipe(first()).subscribe(data => {
        if (!data) {
          let dialogData: DialogData = {
            title: "Nie zarejestrowany",
            context: "Niezmiernie nam przykro, ale nie zostałeś zarejestrowany, prosimy spróbować ponownie.",
          };
          let dialogRef = this.dialog.open(InformationDialogComponent, { data: dialogData });
          dialogRef.afterClosed();
        } else {
          this.showSnackBar('Zapisano zmiany');
          this.getUser();
        }
      });
    }
    else this.showSnackBar("Przykro nam, ale nie zapisano zmian.");
  }

  newAccount() {
    let newAccount = <BankAccount>{
      accountNo: '', currency: '', swift: '',
    }
    let dialogRef = this.dialog.open(AccountDialogComponent, { width: "400px", data: newAccount });
    dialogRef.afterClosed().subscribe(result => {
      let res: BankAccount = result;
      if (isNullOrUndefined(res.id)) {
        this.bankAccounts.push(res);
        this.bankAccountDataSource = new BankAccountDataSource(this.bankAccounts);
      } else this.edit(res);
    });
  }

  edit(account: BankAccount) {
    let dialogRef = this.dialog.open(AccountDialogComponent, { width: "400px", data: account });
    dialogRef.afterClosed().subscribe(result => {
      let res: BankAccount = result;
      let index = this.getBankAccountIndexByAccountNo(res.accountNo);
      this.bankAccounts[index] = res;
      this.bankAccountDataSource = new BankAccountDataSource(this.bankAccounts);
    });
  }

  showSnackBar(text: string) { this.snackBar.open(text, '', { duration: 3000 }); }

  getBankAccountByAccountNo(accountNo: string) {
    return this.bankAccounts.find(x => x.accountNo === accountNo);
  }

  getBankAccountIndexByAccountNo(accountNo: string) {
    return this.bankAccounts.indexOf(this.getBankAccountByAccountNo(accountNo));
  }

  updateArray(newitem) {
    this.bankAccounts[newitem.id] = newitem
  }

  delete(account: BankAccount) {
    let dialogData: YesNoDialogData = {
      title: "Usuwanie konta",
      context: "Czy usunąć konto: " + account.currency + " " + account.accountNo,
      yesButton: "Usuń", noButton: "Anuluj"
    };
    let dialogRef = this.dialog.open(YesNoDialog, { data: dialogData });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let index = this.getBankAccountIndexByAccountNo(account.accountNo);
        if (index !== -1) {
          this.bankAccounts.splice(index, 1);
          this.bankAccountDataSource = new BankAccountDataSource(this.bankAccounts);
          if (!isNullOrUndefined(account.id)) {
            this.userService.deleteAccount(account.id).pipe(first()).subscribe(
              result => {
                if (result) { this.showSnackBar("Udało się usunąć konto"); }
                else this.showSnackBar("Przykro nam, ale nie udało się usunąć konto");
              }
            )
          }
        }
      }
    })
  }

  isValid() {
    return this.company.valid && this.street.valid && this.parcelNo.valid && this.homeNo.valid
      && this.zip.valid && this.city.valid && this.taxForm.valid && this.country.valid 
  }

  isPasswordsThisSame() {
    if (this.password.value != undefined && this.repeatPassword.value != undefined) {
      if (this.password.valid && this.repeatPassword.valid && this.password.value === this.repeatPassword.value) {
        this.user.password = this.password.value;
        this.checkPassword = true;
      } else {
        this.checkPassword = false;
        this.password.setValue(undefined);
        this.repeatPassword.setValue(undefined);
        let dialogData: DialogData = {
          title: "Hasła nie pasują",
          context: "Hasło i powtórzone hasło nie pasują do siebie. Proszę wpisać poprawane dane.",
        };
        let dialogRef = this.dialog.open(InformationDialogComponent, { data: dialogData });
        // dialogRef.close();
      }
    } else {
      this.checkPassword = true;
    }

  }

  ngOnInit() {
    this.initializeForms();
    this.getUser();
  }

  getUser() {
    this.userService.get().pipe(first()).subscribe(user => {
      this.user = user
      this.id = user.id;
      this.email.setValue(this.user.email);
      this.firstName.setValue(this.user.firstName);
      this.company.setValue(this.user.company);
      this.nip.setValue(this.user.nip);
      this.surname.setValue(this.user.surname);
      this.street.setValue(this.user.street);
      this.parcelNo.setValue(this.user.parcelNo);
      this.homeNo.setValue(this.user.homeNo);
      this.zip.setValue(this.user.zip);
      this.city.setValue(this.user.city);
      this.taxForm.setValue(this.user.taxForm);
      this.pkd.setValue(this.user.pkd);
      this.regon.setValue(this.user.regon);
      this.country.setValue(this.user.country);
      this.bankAccounts = this.user.bankAccountSet;
      this.bankAccountDataSource = new BankAccountDataSource(this.bankAccounts);
    });
  }

  initializeForms() {
    this.email = new FormControl({ value: null, disabled: true }, [
      Validators.required,
      Validators.email,
      Validators.pattern("[a-zA-Z0-9.-]+\@[a-zA-Z0-9.-]+\.[a-z]+")
    ]);

    this.firstName = new FormControl(null, [
      Validators.required,
      Validators.maxLength(15)
    ]);

    this.surname = new FormControl(null, [
      Validators.maxLength(15)
    ]);

    this.company = new FormControl(null, [
      Validators.required,
      Validators.maxLength(50)
    ]);

    this.nip = new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]);

    this.street = new FormControl(null, [
      Validators.required,
      Validators.maxLength(20)
    ]);

    this.parcelNo = new FormControl(null, [
      Validators.required,
      Validators.maxLength(5)
    ]);

    this.homeNo = new FormControl(null, [
      Validators.required,
      Validators.maxLength(5)
    ]);

    this.zip = new FormControl(null, [
      Validators.required,
      Validators.maxLength(6),
      Validators.minLength(6),
      Validators.pattern("[0-9]{2}-[0-9]{3}")
    ]);

    this.city = new FormControl(null, [
      Validators.required,
      Validators.maxLength(15)
    ]);

    this.taxForm = new FormControl(null, [
      Validators.required,
    ]);

    this.pkd = new FormControl(null, [
      Validators.maxLength(10)
    ]);

    this.country = new FormControl(null, [
      Validators.required
    ]);

    this.regon = new FormControl(null, [
      Validators.minLength(9),
      Validators.maxLength(14)
    ]);

    this.password = new FormControl(null, [
      Validators.minLength(5),
      Validators.maxLength(12),
      Validators.pattern("[a-zA-Z0-9!@$%^&-+=?]+")
    ]);

    this.repeatPassword = new FormControl(null, [
      Validators.minLength(5),
      Validators.maxLength(12),
      Validators.pattern("[a-zA-Z0-9!@$%^&-+=?]+")
    ]);
  }
}
