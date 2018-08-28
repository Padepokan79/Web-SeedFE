import { TabLanguageComponent } from './tab-language/tab-language.component';
import { TabEmploymentComponent } from './tab-employment/tab-employment.component';
import { TabEducationComponent } from './tab-education/tab-education.component';
import { TabDatapribadiComponent } from './tab-datapribadi/tab-datapribadi.component';
import { TabCourseComponent } from './tab-course/tab-course.component';
import { NgModule } from '../../../../../node_modules/@angular/core';
import { PAGES_MODULE_PROVIDERS } from '../../../app.providers';
import { routing } from '../pages.routing';

const MENGELOLA_SDM_COMPONENTS = [
  TabCourseComponent,
  TabDatapribadiComponent,
  TabEducationComponent,
  TabEmploymentComponent,
  TabLanguageComponent
];

@NgModule({
  imports: [
    ...PAGES_MODULE_PROVIDERS,
    routing
  ],
  exports: [
    ...MENGELOLA_SDM_COMPONENTS
  ],
  declarations: [
    ...MENGELOLA_SDM_COMPONENTS
]
})
export class MengelolaSDMModule { }
