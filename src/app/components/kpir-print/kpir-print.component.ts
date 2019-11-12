import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { KpirFilter, Kpir } from 'src/app/models/models';
import { PrinterService } from 'src/app/services/printer.service';
import { UserService } from 'src/app/services/user.service';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SnackBarService } from '../snackbar/snack-bar.service';


@Component({
  selector: 'app-kpir-print',
  templateUrl: './kpir-print.component.html',
  styleUrls: ['./kpir-print.component.css', '../../app.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class KpirPrintComponent implements OnInit {
  filter: KpirFilter;
  temp: Date;
  globalMinDate: Date;
  economicEventMinDate: Date;
  economicEventMaxDate: Date;
  years: number[] = [];
  pdfFile: SafeResourceUrl;

  kpirFilter = this.fb.group({
    company: [null, [Validators.maxLength(15)]],
    nip: [null, [Validators.maxLength(15)]],
    economicEventDate: [null, [Validators.maxLength(15)]],
    isPayed: [null],
    notPayed: [null],
    overdue: [null],
    selectedYear: null,
  })

  constructor(
    private fb: FormBuilder,
    private service: PrinterService,
    private userService: UserService,
    private domSanitizer: DomSanitizer,
    private snackbar: SnackBarService
  ) {
  }

  ngOnInit() {
    this.userService.getRegistrationDate().subscribe(result => {
      this.temp = new Date()
      this.globalMinDate = new Date(result);
      this.economicEventMinDate = new Date(this.globalMinDate.getFullYear(), this.globalMinDate.getMonth(), 1);
      this.economicEventMaxDate = new Date(this.temp.getFullYear(), (this.temp.getMonth()) + 1), 0;
      for (let i = this.temp.getFullYear(); i >= this.globalMinDate.getFullYear(); i--) {
        this.years.push(i);
      }
      this.filter = {
        company: null, nip: null, economicEventDate: null, isPayed: false,
        notPayed: false, overdue: false, registrationNumber: null, type: null,
        selectedYear: this.temp.getFullYear(), selectedMonth: null
      }
      this.kpirFilter.patchValue(this.filter);
    })
  }

  fill(model: KpirFilter) {
    this.filter = model;
  }

  showFile(model: KpirFilter) {
    this.service.getKpirAllBlob(model).subscribe((data: Blob) => {
      let blob = new Blob([data], { type: 'application/pdf' });
      let url = window.URL.createObjectURL(blob);
      this.pdfFile = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    })
  }

  sendMail(model: KpirFilter) {
    this.service.sendKpirAllViaMail(model).subscribe();
    this.snackbar.show("Mail został wysłany na skrzynkę podaną w ustawieniach")
  }
}
