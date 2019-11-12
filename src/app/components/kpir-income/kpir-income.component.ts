import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContractorSelect, Kpir } from 'src/app/models/models';
import { isNullOrUndefined } from 'util';
import { ContractorService } from 'src/app/services/contractor.service';
import { KpirService } from 'src/app/services/kpir.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/components/snackbar/snack-bar.service';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { ErrorFieldsMatcherService } from 'src/app/services/error-fields-matcher.service';

@Component({
  selector: 'app-kpir-income',
  templateUrl: './kpir-income.component.html',
  styleUrls: ['./kpir-income.component.css', '../../app.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class KpirIncomeComponent implements OnInit, OnDestroy {
  kpir = this.fb.group({
    idx: null,
    economicEventDate: [null, Validators.required],
    registrationNumber: [null, Validators.required],
    contractor: [null, Validators.required],
    description: [null, Validators.required],
    soldIncome: [null, Validators.required],
    otherIncome: [null, Validators.required],
    payed: [{value:false}, Validators.required],
    comments: null,
    paymentDateMin: [null, Validators.required],
    paymentDateMax: [null, Validators.required],
    allIncome: null,
    currency: [null, Validators.required],
  });
  contractors: ContractorSelect[];

  constructor(
    private fb: FormBuilder,
    private contractorService: ContractorService,
    private service: KpirService,
    private snackbar: SnackBarService,
    public matcher: ErrorFieldsMatcherService,
    private router: Router,
  ) {
    this.contractorService.getAllSelect().subscribe(result => {
      this.contractors = result;
    });
  }

  ngOnInit(): void {
    if (isNullOrUndefined(this.service.kpirId)) {
      this.service.getNextIdx().subscribe(result => {
        let today = new Date();
        this.kpir.patchValue({ idx: result, economicEventDate: today });
      })
    } else {
      this.service.getOne(this.service.kpirId).subscribe(result => {
        this.kpir.patchValue(result);

      })
    }
  }

  ngOnDestroy(): void {
    this.service.kpirId = undefined;
  }

  calculateAllIncome() {
    return Number(this.kpir.value.soldIncome) + Number(this.kpir.value.otherIncome);
  }

  save(model: Kpir, isValid: boolean) {
    if (isValid) {
      model.allIncome = this.calculateAllIncome();
      model.type = 'INCOME';
      if (isNaN(this.service.kpirId)) {
        this.service.create(model).subscribe(result => {
          if (result) {
            this.snackbar.show("Utworzono nowegy przychód")
          } else {
            this.snackbar.show("Błąd, nie utworzono przychódu")
          }
        })
      } else {
        model.id = this.service.kpirId;
        this.service.update(model).subscribe(result => {
          if (result) {
            this.snackbar.show("Uaktualniono przychód")
          } else {
            this.snackbar.show("Błąd, nie utworzono przychódu")
          }
        })
      }
      this.service.kpirId = null;
      this.router.navigateByUrl("/kpir/income");
    }
  }

}
