import { MengelolaSDMModule } from './mengelola-sdm/mengelola-sdm.module';
import { InputSdmComponent } from './mengelola-sdm/input-sdm/input-sdm.component';
import { FormWithTableComponent } from './example/form-with-table/form-with-table.component';
import { SdwMaintenanceComponent } from './sdw-maintenance/sdw-maintenance.component';
import { routing } from './pages.routing';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages.component';
import { RegisterComponent } from './register/register.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

import { SdwLayoutComponent } from './sdw-layout/sdw-layout.component';
import { PAGES_MODULE_PROVIDERS } from '../../app.providers';
import { ListCategoryComponent } from './list-category/list-category.component';
import { ListDetailClientComponent } from './project-assignment/list-detail-client/list-detail-client.component';
import { TabProfilComponent } from './mengelola-sdm/tab-profil/tab-profil.component';
import { SDMModule } from './SDM/sdm.module';
import { ALLModule } from './ALLOCATION/all.module';
import { PJAModule } from './PJA/pja.module';

@NgModule({
  imports: [
    ...PAGES_MODULE_PROVIDERS,
    MengelolaSDMModule,
    SDMModule,
    ALLModule,
    PJAModule,
    routing
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    PagesComponent,
    RegisterComponent,
    UnauthorizedComponent,
    SdwMaintenanceComponent,
    FormWithTableComponent,
    SdwLayoutComponent,
    ListCategoryComponent,
    ListDetailClientComponent,
    TabProfilComponent,
    InputSdmComponent,
    // TabCourseComponent,
    // TabDatapribadiComponent,
    // TabEducationComponent,
    // TabEmploymentComponent,
    // TabLanguageComponent,
    // SDM005Component
    // SDM001Component,
    // ListDetailClientComponent,
    // TabDatapribadiComponent,
    // TabEducationComponent,
    // TabCourseComponent,
    // TabEmploymentComponent,
    // TabProfilComponent,
    // TabLanguageComponent,
    // SDM003Component,
    // SDM002Component,
    // SDM006Component,
    // SDM007Component
  ]
})
export class PagesModule { }
