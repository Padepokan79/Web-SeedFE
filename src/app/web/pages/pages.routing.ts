import { FormWithTableComponent } from './example/form-with-table/form-with-table.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PagesComponent } from './pages.component';

import { AuthGuard } from './../../core/auth/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SdwLayoutComponent } from './sdw-layout/sdw-layout.component';
import { ListDetailClientComponent } from './project-assignment/list-detail-client/list-detail-client.component';
import { SDM001Component } from './SDM/mengelola-sdm/SDM001/SDM001.component';
import { SDM003Component } from './SDM/mengelola-sdm/SDM003/SDM003.component';
import { SDM002Component } from './SDM/mengelola-sdm/SDM002/SDM002.component';
import { SDM006Component } from './SDM/SDM006/SDM006.component';
import { SDM007Component } from './SDM/SDM007/SDM007.component';
import { SDM_ROUTES } from './SDM/sdm.routing';
import { ALL_ROUTES } from './ALLOCATION/all.routing';
import { PJA_ROUTES } from './PJA/pja.routing';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'pages',
    component: PagesComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: HomeComponent },
      ...SDM_ROUTES,
      ...ALL_ROUTES,
      ...PJA_ROUTES,
      // { path: 'tampilkan', component: SdwLayoutComponent },
      // { path: 'example', component: FormWithTableComponent },
      // { path: 'SDM001', component: SDM001Component },
      // { path: 'SDM003', component: SDM003Component },
      // { path: 'list-detail-client', component: ListDetailClientComponent },
      // { path: 'SDM002', component: SDM002Component },
      // { path: 'SDM006',  component: SDM006Component },
      // { path: 'SDM007',  component: SDM007Component }
    ]
  }
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
