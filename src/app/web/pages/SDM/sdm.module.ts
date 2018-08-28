import { SDM001Component } from './mengelola-sdm/SDM001/SDM001.component';
import { NgModule } from '../../../../../node_modules/@angular/core';
import { PAGES_MODULE_PROVIDERS } from '../../../app.providers';
import { routing } from '../pages.routing';
import { TabCourseComponent } from './mengelola-sdm/tab-course/tab-course.component';
import { TabDatapribadiComponent } from './mengelola-sdm/tab-datapribadi/tab-datapribadi.component';
import { TabEducationComponent } from './mengelola-sdm/tab-education/tab-education.component';
import { TabEmploymentComponent } from './mengelola-sdm/tab-employment/tab-employment.component';
import { TabLanguageComponent } from './mengelola-sdm/tab-language/tab-language.component';
import { TabProfilComponent } from './mengelola-sdm/tab-profil/tab-profil.component';
import { TabDetailCourseComponent } from './mengelola-sdm/SDM009/tabDetail-course/tabDetail-course.component';
import { TabDetailDataPribadiComponent } from './mengelola-sdm/SDM009/tabDetail-dataPribadi/tabDetail-dataPribadi.component';
import { TabDetailEducationComponent } from './mengelola-sdm/SDM009/tabDetail-Education/tabDetail-Education.component';
import { TabDetailEmploymentComponent } from './mengelola-sdm/SDM009/tabDetail-employment/tabDetail-employment.component';
import { TabDetailLanguageComponent } from './mengelola-sdm/SDM009/tabDetail-language/tabDetail-language.component';
import { TabDetailProfilComponent } from './mengelola-sdm/SDM009/tabDetail-profil/tabDetail-profil.component';
import { SDM003Component } from './mengelola-sdm/SDM003/SDM003.component';
import { SDM002Component } from './mengelola-sdm/SDM002/SDM002.component';
import { SDM009Component } from './mengelola-sdm/SDM009/SDM009.component';
import { SDM006Component } from './SDM006/SDM006.component';
import { SDM007Component } from './SDM007/SDM007.component';
import { SDM008Component } from './SDM008/SDM008.component';
import { SDM004Component } from './SDM004/SDM004.component';

const SDM_COMPONENTS = [
    SDM001Component,
    TabCourseComponent,
    TabDatapribadiComponent,
    TabEducationComponent,
    TabEmploymentComponent,
    TabLanguageComponent,
    TabProfilComponent,
    TabDetailCourseComponent,
    TabDetailDataPribadiComponent,
    TabDetailEducationComponent,
    TabDetailEmploymentComponent,
    TabDetailLanguageComponent,
    TabDetailProfilComponent,
    SDM002Component,
    SDM003Component,
    SDM004Component,
    SDM006Component,
    SDM007Component,
    SDM008Component,
    SDM009Component
];

@NgModule({
  imports: [
    ...PAGES_MODULE_PROVIDERS,
    routing
  ],
  exports: [
    ...SDM_COMPONENTS
  ],
  declarations: [
    ...SDM_COMPONENTS
]
})
export class SDMModule { }
