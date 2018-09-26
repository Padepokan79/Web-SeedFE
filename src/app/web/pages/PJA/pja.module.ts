import { NgModule } from '@angular/core';
import { PJA001Component } from './PJA001/PJA001.component';
import { PAGES_MODULE_PROVIDERS } from '../../../app.providers';
import { routing } from '../pages.routing';
import { PJA002Component } from './PJA002/PJA002.component';
import { PJA003Component } from './PJA003/PJA003.component';
import { PJA004Component } from './PJA004/PJA004.component';
import { PJA005Component } from './PJA005/PJA005.component';
import { PJA006Component } from './PJA006/PJA006.component';
import { PJA012Component } from './PJA012/PJA012.component';
import { SdmHiringListComponent } from './sdm-hiring-list/sdm-hiring-list.component';
import { SdmHiringUpdateComponent } from './sdm-hiring-update/sdm-hiring-update.component';
import { SdmAssignmentComponent } from './sdm-assignment/sdm-assignment.component';
import { SdmAssignmentUpdateComponent } from './sdm-assignment-update/sdm-assignment-update.component';
import { SearchCriteria } from './PJA012/SearchCriteria';
import { PJA010Component } from './PJA010/PJA010.component';
import { PJA011Component } from './PJA011/PJA011.component';
import { PJA007Component } from './PJA007/PJA007.component';
import { PJA009Component } from './PJA009/PJA009.component';
import { PJA008Component } from './PJA008/PJA008.component';
import { PJA003RComponent } from './PJA003R/PJA003R.component';
import { PopUpDetailComponent } from './PJA003R/PopUpDetail/PopUpDetail.component';
import { PopUpDetailSkillSdmComponent } from './PJA008/PopUpDetailSkillSdm/PopUpDetailSkillSdm.component';
// import { SearchCriteria } from './PJA012/SearchCriteria';

const PJA_COMPONENTS = [
    PJA001Component,
    PJA002Component,
    PJA003Component,
    PJA004Component,
    PJA005Component,
    PJA006Component,
    PJA012Component,
    PJA007Component,
    PJA008Component,
    PJA009Component,
    PJA010Component,
    PJA011Component,
    PJA012Component,
    PJA003RComponent,
    PopUpDetailComponent,
    PopUpDetailSkillSdmComponent
    // SearchCriteria
];

@NgModule({
  imports: [
    ...PAGES_MODULE_PROVIDERS,
    routing
  ],
  exports: [
    ...PJA_COMPONENTS
  ],
  declarations: [
    ...PJA_COMPONENTS
]
})
export class PJAModule { }
