import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { KpirIncomeListComponent } from './components/kpir/kpir-income-list.component';
import { AuthGuard } from './authorization/auth.guard';
import { SettingsComponent } from './components/settings/settings.component';
import { ContractorListComponent } from './components/contractor-list/contractor-list.component';
import { ContractorComponent } from './components/contractor/contractor.component';
import { KpirIncomeComponent } from './components/kpir-income/kpir-income.component';
import { KpirCostsListComponent } from './components/kpir-costs-list/kpir-costs-list.component';
import { KpirCostsComponent } from './components/kpir-costs/kpir-costs.component';
import { ActivateComponent } from './components/activate/activate.component';
import { AboutComponent } from './components/about/about.component';
import { KpirPrintComponent } from './components/kpir-print/kpir-print.component';
import { LegalBasisComponent } from './components/legal-basis/legal-basis.component';

const routes: Routes = [
  { path: '', redirectTo: '/kpir/income', pathMatch: 'full', canActivate: [AuthGuard]  },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'legal', component: LegalBasisComponent },
  { path: 'activate/:hash', component: ActivateComponent  },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]  },
  { path: 'kpir/income', component: KpirIncomeListComponent, canActivate: [AuthGuard]  },
  { path: 'kpir/income/add', component: KpirIncomeComponent, canActivate: [AuthGuard]  },
  { path: 'kpir/printer', component: KpirPrintComponent, canActivate: [AuthGuard]  },
  { path: 'kpir/costs', component: KpirCostsListComponent, canActivate: [AuthGuard]  },
  { path: 'kpir/costs/add', component: KpirCostsComponent, canActivate: [AuthGuard]  },
  { path: 'contractors', component: ContractorListComponent, canActivate: [AuthGuard]  },
  { path: 'contractor/:id', component: ContractorComponent, canActivate: [AuthGuard]  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
