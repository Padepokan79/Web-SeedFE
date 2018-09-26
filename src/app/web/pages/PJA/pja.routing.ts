import { PJA001Component } from './PJA001/PJA001.component';
import { AuthGuard } from '../../../core/auth/auth-guard';
import { PJA003Component } from './PJA003/PJA003.component';
import { PJA005Component } from './PJA005/PJA005.component';
import { PJA004Component } from './PJA004/PJA004.component';
import { SdmHiringListComponent } from './sdm-hiring-list/sdm-hiring-list.component';
import { SdmHiringUpdateComponent } from './sdm-hiring-update/sdm-hiring-update.component';
import { PJA006Component } from './PJA006/PJA006.component';
import { PJA002Component } from './PJA002/PJA002.component';
import { PJA012Component } from './PJA012/PJA012.component';
import { SdmAssignmentComponent } from './sdm-assignment/sdm-assignment.component';
import { SdmAssignmentUpdateComponent } from './sdm-assignment-update/sdm-assignment-update.component';
import { PJA010Component } from './PJA010/PJA010.component';
import { PJA011Component } from './PJA011/PJA011.component';
import { PJA007Component } from './PJA007/PJA007.component';
import { PJA009Component } from './PJA009/PJA009.component';
import { PJA008Component } from './PJA008/PJA008.component';
import { PJA003RComponent } from './PJA003R/PJA003R.component';
import { PopUpDetailComponent } from './PJA003R/PopUpDetail/PopUpDetail.component';
import { PopUpDetailSkillSdmComponent } from './PJA008/PopUpDetailSkillSdm/PopUpDetailSkillSdm.component';

export const PJA_ROUTES = [
    {
      path: 'pja',
      children: [
        { path: 'PJA001', component: PJA001Component, canActivate: [AuthGuard] },
        { path: 'PJA002', component: PJA002Component, canActivate: [AuthGuard] },
        { path: 'PJA003', component: PJA003Component, canActivate: [AuthGuard] },
        { path: 'PJA005', component: PJA005Component, canActivate: [AuthGuard] },
        { path: 'PJA004', component: PJA004Component, canActivate: [AuthGuard] },
        { path: 'PJA006', component: PJA006Component, canActivate: [AuthGuard] },
        { path: 'PJA007', component: PJA007Component, canActivate: [AuthGuard] },
        { path: 'PJA008', component: PJA008Component, canActivate: [AuthGuard] },
        { path: 'PJA009', component: PJA009Component, canActivate: [AuthGuard] },
        { path: 'PJA010', component: PJA010Component, canActivate: [AuthGuard] },
        { path: 'PJA011', component: PJA011Component, canActivate: [AuthGuard] },
        { path: 'PJA012', component: PJA012Component, canActivate: [AuthGuard] },
        { path: 'PJA003R', component: PJA003RComponent, canActivate: [AuthGuard] },
        { path: 'PopUpDetail', component: PopUpDetailComponent, canActivate: [AuthGuard] },
        { path: 'PopUpDetailSkillSdm', component: PopUpDetailSkillSdmComponent, canActivate: [AuthGuard] }
      ]
    }
  ];
