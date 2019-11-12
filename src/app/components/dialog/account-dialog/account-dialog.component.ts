import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BankAccount } from 'src/app/models/models';
import { FormControl, Validators } from '@angular/forms';
import { isUndefined } from 'util';
import { ErrorFieldsMatcherService } from 'src/app/services/error-fields-matcher.service';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['../../../app.component.css']
})
export class AccountDialogComponent {
  title: string;
  yesButton: string;
  currencyFC: FormControl;
  swiftFC: FormControl;
  accountNoFC: FormControl;
  constructor(public dialogRef: MatDialogRef<AccountDialogComponent>,
    public matcher: ErrorFieldsMatcherService,
    @Inject(MAT_DIALOG_DATA) public data: BankAccount,
  ) {

    this.accountNoFC = new FormControl('', [
      Validators.required,
      Validators.maxLength(26),
      Validators.minLength(26),
    ]);
    this.currencyFC = new FormControl('', [
      Validators.required
    ]);
    this.swiftFC = new FormControl('', [
      Validators.required
    ]);
    if (data.accountNo === '') {
      this.title = "Nowe konto bankowe";
      this.yesButton = "Dodaj";
    }
    else {
      this.title = "Edycja konta: " + data.accountNo;
      this.yesButton = "Zapisz";
      this.accountNoFC.setValue(data.accountNo);
      this.currencyFC.setValue(data.currency);
      this.swiftFC.setValue(data.swift);
    }

  }

  isValid() {
    return this.swiftFC.valid && this.accountNoFC.valid && this.currencyFC.valid;
  }

  checkAndGetValues() {
    this.data.swift = this.swiftFC.value;
    this.data.accountNo = this.accountNoFC.value;
    this.data.currency = this.currencyFC.value;
    return this.data;
  }

  noClick() {
    this.dialogRef.close();
  }

}
