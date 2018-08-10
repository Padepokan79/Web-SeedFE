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
import { PAGES_MODULE_PROVIDERS } from 'app/app.providers';
import { ListCategoryComponent } from 'app/web/pages/list-category/list-category.component';
import { ListDetailClientComponent } from './project-assignment/list-detail-client/list-detail-client.component';
import { TabDatapribadiComponent } from './SDM/mengelola-sdm/tab-datapribadi/tab-datapribadi.component';
import { TabEducationComponent } from './SDM/mengelola-sdm/tab-education/tab-education.component';
import { TabCourseComponent } from './SDM/mengelola-sdm/tab-course/tab-course.component';
import { TabEmploymentComponent } from './SDM/mengelola-sdm/tab-employment/tab-employment.component';
import { TabProfilComponent } from './mengelola-sdm/tab-profil/tab-profil.component';
import { TabLanguageComponent } from './SDM/mengelola-sdm/tab-language/tab-language.component';
import { SDM001Component } from './SDM/mengelola-sdm/SDM001/SDM001.component';
import { SDM003Component } from './SDM/mengelola-sdm/SDM003/SDM003.component';
import { SDM002Component } from './SDM/mengelola-sdm/SDM002/SDM002.component';
import { SDM006Component } from './SDM/SDM006/SDM006.component';
import { SDM007Component } from './SDM/SDM007/SDM007.component';
import { SDMModule } from './SDM/sdm.module';
import { ALLModule } from './ALLOCATION/all.module';
import { PJAModule } from './PJA/pja.module';

@NgModule({
  imports: [
    ...PAGES_MODULE_PROVIDERS,
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
