import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BankAccount, Contractor, YesNoDialogData } from 'src/app/models/models';
import { ErrorFieldsMatcherService } from 'src/app/services/error-fields-matcher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractorService } from 'src/app/services/contractor.service';
import { isNullOrUndefined } from 'util';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AccountDialogComponent } from '../dialog/account-dialog/account-dialog.component';
import { YesNoDialog } from '../dialog/yes-no-dialog/yes-no-dialog.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.css', '../../app.component.css'],
})
export class ContractorComponent implements OnInit {
  title: string;

  contractor = this.fb.group({
    email: [null, [
      Validators.required,
      Validators.email,
      Validators.pattern("[a-zA-Z0-9.-]+\@[a-zA-Z0-9.-]+\.[a-z]+")
    ]],
    firstname: [null, [
      Validators.required,
      Validators.maxLength(15)
    ]],
    surname: [null, [
      Validators.required,
      Validators.maxLength(15)
    ]],
    company: [null, [
      Validators.required,
    ]],
    nip: [null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]],
    street: [null, [
      Validators.required,
      Validators.maxLength(20)
    ]],
    parcelNo: [null, [
      Validators.required,
      Validators.maxLength(5)
    ]],
    homeNo: [null, [
      Validators.maxLength(5)
    ]],
    zip: [null, [
      Validators.required,
      Validators.maxLength(6),
      Validators.minLength(6),
      Validators.pattern("[0-9]{2}-[0-9]{3}")
    ]],
    city: [null, [
      Validators.required,
      Validators.maxLength(15)
    ]],
    country: [null, [Validators.required,]],
    trade: [null, [Validators.maxLength(15)]],
    phone: [null, [Validators.maxLength(15)]],
    creditor: false,
    debtor: false,
    creditorAmount: 0,
    debtorAmount: 0,
  });
  account: BankAccount;
  id: number;

  constructor(
    private fb: FormBuilder,
    public matcher: ErrorFieldsMatcherService,
    private route: ActivatedRoute,
    private router: Router,
    private service: ContractorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.contractor.value.creditor
    let sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (isNaN(this.id)) {
      this.title = "Nowy kontrahent";
    } else {
      this.service.getOne(this.id).subscribe(result => {
        if (result.bankAccounts.length > 0) {
          this.account = result.bankAccounts[0];
        }
        this.contractor.patchValue(result);
        this.title = "Edycja kontrahenta: " + result.company + " " + result.nip;
      })
    }
  }

  save(model: Contractor, isValid: boolean) {
    if (isValid) {
      model.bankAccounts = [];
      model.bankAccounts.push(this.account);
      if (isNaN(this.id)) {
        console.log(model)
        this.service.create(model).subscribe(result => {
          if (result) {
            this.showSnackBar("Utworzono nowego kontrahenta")
          } else {
            this.showSnackBar("Błąd, nie utworzono kontrahenta")
          }
        })
      } else {
        model.id = this.id;
        this.service.update(model).subscribe(result => {
          if (result) {
            this.showSnackBar("Uaktualniono kontrahenta")
          } else {
            this.showSnackBar("Błąd, nie utworzono kontrahenta")
          }
        })
      }
      this.router.navigateByUrl("/contractors");
    }
  }

  newAccount() {
    let newAccount = <BankAccount>{
      accountNo: '', currency: '', swift: '',
    }
    let dialogRef = this.dialog.open(AccountDialogComponent, { width: "400px", data: newAccount });
    dialogRef.afterClosed().subscribe(result => {
      if (!isNullOrUndefined(result.accountNo)){
        this.account = result;
      }
      this.showSnackBar("Aby zapisać wprowadzone konto proszę wscisnąć przycisk zapisz.");
    });
  }

  edit() {
    let dialogRef = this.dialog.open(AccountDialogComponent, { width: "400px", data: this.account });
    dialogRef.afterClosed().subscribe(result => {
      if (!isNullOrUndefined(result.accountNo)){
        this.account = result;
      }
      this.showSnackBar("Aby zapisać zmiany w koncie bankowym proszę wscisnąć przycisk zapisz.");
    });
  }

  delete() {
    let dialogData: YesNoDialogData = {
      title: "Usuwanie konta",
      context: "Czy usunąć konto: " + this.account.currency + " " + this.account.accountNo,
      yesButton: "Usuń", noButton: "Anuluj"
    };
    let dialogRef = this.dialog.open(YesNoDialog, { data: dialogData });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!isNullOrUndefined(this.account.id)) {
          this.userService.deleteAccount(this.account.id).subscribe(
            result => {
              if (result) { this.showSnackBar("Udało się usunąć konto"); }
              else this.showSnackBar("Przykro nam, ale nie udało się usunąć konto");
            }
          )
        }
      }
      this.account = undefined;
    })
  }

  showSnackBar(text: string) { this.snackBar.open(text, '', { duration: 3000 }); }

}
