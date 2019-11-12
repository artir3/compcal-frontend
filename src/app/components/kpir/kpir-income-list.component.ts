import { Component, OnInit, ViewChild, LOCALE_ID } from '@angular/core';
import { MatPaginator, MatSort, MatDatepicker, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDialog } from '@angular/material';
import { KpirListDataSource } from '../../datasource/kpir-datasource';
import { FormBuilder, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
import { Kpir, KpirFilter, YesNoDialogData } from 'src/app/models/models';
import { KpirService } from 'src/app/services/kpir.service';
import { isNullOrUndefined, isUndefined } from 'util';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { Global } from 'src/app/models/global';
import { SnackBarService } from 'src/app/components/snackbar/snack-bar.service';
import { YesNoDialog } from '../dialog/yes-no-dialog/yes-no-dialog.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-kpir-income-list',
  templateUrl: './kpir-income-list.component.html',
  styleUrls: ['./kpir-income-list.component.css', '../../app.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    { provide: LOCALE_ID, useValue: 'pl-PL' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class KpirIncomeListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columns = ["idx", "economicEventDate", "registrationNumber", "fullName", /* "description", */ "soldIncome", "otherIncome", "allIncome", /* "comments", */ "actions"];
  headerFirstLine = ["idx", "economicEventDate", "registrationNumber", "consumer", /* "description", */ "income", /* "comments", */ "actions"];
  headerSecondLine = ["fullName", "soldIncome", "otherIncome", "allIncome"];
  dataSource: KpirListDataSource;
  filter: KpirFilter;
  kpirs: Kpir[];
  
  temp: Date;
  globalMinDate: Date;
  economicEventMinDate: Date;
  economicEventMaxDate: Date;
  years: number[] = [];
  months: any[] = [];

  kpirFilter = this.fb.group({
    company: [null, [Validators.maxLength(15)]],
    nip: [null, [Validators.maxLength(15)]],
    registrationNumber: [null, [Validators.maxLength(15)]],
    economicEventDate: [null, [Validators.maxLength(15)]],
    isPayed: null,
    notPayed: null,
    overdue: null,
    selectedYear: null,
    selectedMonth: null,
    type: null,
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: KpirService,
    private userService: UserService,
    private snackbar: SnackBarService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.temp = new Date()
    this.filter = {
      company: null, nip: null, economicEventDate: null, isPayed: null,
      notPayed: null, overdue: null, registrationNumber: null, type: 'INCOME',
      selectedYear: this.temp.getFullYear(), selectedMonth: Global.allMonths[this.temp.getMonth()].no
    }
    this.kpirFilter.patchValue(this.filter);
    this.userService.getRegistrationDate().pipe(first()).subscribe(result => {
      this.globalMinDate = new Date(result);
      this.economicEventMinDate = new Date(this.globalMinDate.getFullYear(), this.globalMinDate.getMonth(), 1);
      this.economicEventMaxDate = new Date(this.temp.getFullYear(), (this.temp.getMonth()) + 1), 0;
      for (let i = this.temp.getFullYear(); i >= this.globalMinDate.getFullYear(); i--) {
        this.years.push(i);
      }
      this.changeYear();
    })
    this.refresh();
  }

  refresh() {
    this.service.getAll(this.filter).subscribe(result => {
      this.kpirs = result;
      if (isNullOrUndefined(this.kpirs)) {
        this.kpirs = [];
      }
      this.dataSource = new KpirListDataSource(this.paginator, this.sort, this.kpirs);
    })
  }

  checkSelectedYear(){
    return isUndefined(this.kpirFilter.value.selectedYear)
  }

  doFilter(model: KpirFilter) {
    this.filter = model;
    this.filter.type = 'INCOME';
    this.refresh();
  }

  edit(element: Kpir) {
    this.service.kpirId = element.id;
    this.router.navigateByUrl("/kpir/income/add");
  }

  delete(element: Kpir) {
    let dialogData: YesNoDialogData = {
      title: "Usuwanie przychodu",
      context: "Czy usunąć przychód nr " + element.idx + " z dnia: " + formatDate(element.economicEventDate, "dd-MM-yyyy", "en-US") + "?",
      yesButton: "Usuń", noButton: "Anuluj"
    };
    let dialogRef = this.dialog.open(YesNoDialog, { data: dialogData });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(element.id).subscribe(
          result => {
            if (result) {
              this.snackbar.show("Udało się usunąć przychód");
              this.refresh();
            } else this.snackbar.show("Przykro nam, ale nie udało się przychodu");
          })
      }
    })
  }

  getSoldIncome() {
    if (isUndefined(this.dataSource)) { return 0; }
    return this.dataSource.getData().map(t => t.soldIncome).reduce((acc, value) => acc + value, 0);
  }
  getOtherIncome() {
    if (isUndefined(this.dataSource)) { return 0; }
    return this.dataSource.getData().map(t => t.otherIncome).reduce((acc, value) => acc + value, 0);
  }
  getAllIncome() {
    if (isUndefined(this.dataSource)) { return 0; }
    return this.dataSource.getData().map(t => t.allIncome).reduce((acc, value) => acc + value, 0);
  }
  getPagedSoldIncome() {
    if (isUndefined(this.dataSource)) { return 0; }
    return this.dataSource.getPageData().map(t => t.soldIncome).reduce((acc, value) => acc + value, 0);
  }
  getPagedOtherIncome() {
    if (isUndefined(this.dataSource)) { return 0; }
    return this.dataSource.getPageData().map(t => t.otherIncome).reduce((acc, value) => acc + value, 0);
  }
  getPagedAllIncome() {
    if (isUndefined(this.dataSource)) { return 0; }
    return this.dataSource.getPageData().map(t => t.allIncome).reduce((acc, value) => acc + value, 0);
  }

  getName() {
    return isNullOrUndefined(this.kpirFilter.value.selectedMonth) ? 'roku' : 'miesiąca';
  }

  changeYear() {
    this.months = [];
    this.kpirFilter.value.selectedMonth = undefined;
    if (isNullOrUndefined(this.temp)) {
      this.temp = new Date();
    }
    if (this.temp.getFullYear() == this.globalMinDate.getFullYear()) {
      for (let i = this.globalMinDate.getMonth(); i <= this.temp.getMonth(); i++) {
        this.months.push(Global.allMonths[i]);
      }
    }
    else if (this.kpirFilter.value.selectedYear == (this.globalMinDate.getFullYear())) {
      for (let i = this.globalMinDate.getMonth(); i < Global.allMonths.length; i++) {
        this.months.push(Global.allMonths[i]);
      }
    } else if (this.kpirFilter.value.selectedYear == (this.temp.getFullYear())) {
      for (let i = 0; i <= this.temp.getMonth(); i++) {
        this.months.push(Global.allMonths[i]);
      }
    } else if (this.kpirFilter.value.selectedYear != undefined) {
      this.months = Global.allMonths;
    }
  }
}