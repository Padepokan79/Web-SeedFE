import { ALL001Component } from './ALL001/ALL001.component';
import { PAGES_MODULE_PROVIDERS } from '../../../app.providers';
import { routing } from '../pages.routing';
import { NgModule } from '../../../../../node_modules/@angular/core';
import { ALL002Component } from './ALL002/ALL002.component';
import { ALL005Component } from './ALL005/ALL005.component';
import { ALL003Component } from './ALL003/ALL003.component';
import { ALL004Component } from './ALL004/ALL004.component';
import { InputSkill } from './ALL004/InputSkill';
import { HttpClientModule } from '@angular/common/http';
import { ALL006Component } from './ALL006/ALL006.component';
import { DetailSkillSdmComponent } from './ALL003/DetailSkillSdm/DetailSkillSdm.component';
import { EditNilaiSdmComponent } from './ALL003/EditNilaiSdm/EditNilaiSdm.component';
import { PopUpDetailSkillSdmComponent } from './ALL006/PopUpDetailSkillSdm/PopUpDetailSkillSdm.component';

const ALL_COMPONENTS = [
    ALL001Component,
    ALL002Component,
    ALL003Component,
    ALL004Component,
    ALL005Component,
    ALL006Component,
    DetailSkillSdmComponent,
    EditNilaiSdmComponent,
    PopUpDetailSkillSdmComponent
    // InputSkill
];

@NgModule({
  imports: [
    ...PAGES_MODULE_PROVIDERS,
    routing,
    HttpClientModule
  ],
  exports: [
    ...ALL_COMPONENTS
  ],
  declarations: [
    ...ALL_COMPONENTS
]
})
export class ALLModule { }
