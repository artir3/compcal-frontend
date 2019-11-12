import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule, MatNativeDateModule, 
  MatDatepickerModule, MatSelectModule, MatIconModule, MatMenuModule, MatDialogModule, MatSnackBarModule,
  MatToolbarModule, MatInputModule, MatCardModule, MatRadioModule,MatTooltipModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { KpirIncomeListComponent } from './components/kpir/kpir-income-list.component';
import { ActiveMenuComponent } from './components/active-menu/active-menu.component';
import { BasicAuthInterceptor } from './interceptors/basic-auth.interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { InformationDialogComponent } from './components/dialog/information-dialog/information-dialog.component';
import { YesNoDialog } from './components/dialog/yes-no-dialog/yes-no-dialog.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountDialogComponent } from './components/dialog/account-dialog/account-dialog.component';
import { ContractorListComponent } from './components/contractor-list/contractor-list.component';
import { ContractorComponent } from './components/contractor/contractor.component';
import { KpirIncomeComponent } from './components/kpir-income/kpir-income.component';
import { KpirCostsListComponent } from './components/kpir-costs-list/kpir-costs-list.component';
import { KpirCostsComponent } from './components/kpir-costs/kpir-costs.component';
import { ActivateComponent } from './components/activate/activate.component';
import { AboutComponent } from './components/about/about.component';
import { KpirPrintComponent } from './components/kpir-print/kpir-print.component';
import { LegalBasisComponent } from './components/legal-basis/legal-basis.component';
import { registerLocaleData } from '@angular/common';
import pl from '@angular/common/locales/pl';

registerLocaleData(pl, 'pl-PL');

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    KpirIncomeListComponent,
    ActiveMenuComponent,
    InformationDialogComponent,
    YesNoDialog,
    SettingsComponent,
    AccountDialogComponent,
    ContractorListComponent,
    ContractorComponent,
    KpirIncomeComponent,
    KpirCostsListComponent,
    KpirCostsComponent,
    ActivateComponent,
    AboutComponent,
    KpirPrintComponent,
    LegalBasisComponent,
  ],
  imports: [
    BrowserModule,
    ScrollDispatchModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    AppRoutingModule,
    MatDialogModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTooltipModule,
    MatInputModule,
    MatDatepickerModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatNativeDateModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule, 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [InformationDialogComponent, YesNoDialog,AccountDialogComponent]
})
export class AppModule { }
