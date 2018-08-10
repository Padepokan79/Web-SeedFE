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
        { path: 'PJA007', component: SdmHiringListComponent, canActivate: [AuthGuard] },
        { path: 'PJA008', component: SdmHiringUpdateComponent, canActivate: [AuthGuard] },
        { path: 'PJA010', component: SdmAssignmentComponent, canActivate: [AuthGuard] },
        { path: 'PJA011', component: SdmAssignmentUpdateComponent, canActivate: [AuthGuard] },
        { path: 'PJA012', component: PJA012Component, canActivate: [AuthGuard] },
      ]
    }
  ];
