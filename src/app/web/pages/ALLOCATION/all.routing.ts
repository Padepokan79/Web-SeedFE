import { ALL001Component } from './ALL001/ALL001.component';
import { AuthGuard } from '../../../core/auth/auth-guard';
import { ALL002Component } from './ALL002/ALL002.component';
import { ALL003Component } from './ALL003/ALL003.component';
import { ALL005Component } from './ALL005/ALL005.component';
import { ALL004Component } from './ALL004/ALL004.component';
import { InputSkill } from './ALL004/InputSkill';
import { ALL006Component } from './ALL006/ALL006.component';
import { DetailSkillSdmComponent } from './ALL003/DetailSkillSdm/DetailSkillSdm.component';
import { EditNilaiSdmComponent } from './ALL003/EditNilaiSdm/EditNilaiSdm.component';

export const ALL_ROUTES = [
    {
      path: 'all',
      children: [
        { path: 'ALL001', component: ALL001Component, canActivate: [AuthGuard] },
        { path: 'ALL002', component: ALL002Component, canActivate: [AuthGuard] },
        { path: 'ALL003', component: ALL003Component, canActivate: [AuthGuard] },
        { path: 'ALL004', component: ALL004Component, canActivate: [AuthGuard] },
        { path: 'ALL005', component: ALL005Component, canActivate: [AuthGuard] },
        { path: 'ALL006', component: ALL006Component, canActivate: [AuthGuard] },
        // { path: 'inputskill', component: InputSkill, canActivate: [AuthGuard] },
        { path: 'DetailSkillSdm', component: DetailSkillSdmComponent, canActivate: [AuthGuard] },
        { path: 'EditNilaiSdm', component: EditNilaiSdmComponent, canActivate: [AuthGuard] },
      ]
    }
  ];
