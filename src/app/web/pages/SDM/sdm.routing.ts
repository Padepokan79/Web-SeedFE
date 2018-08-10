import { SDM001Component } from './mengelola-sdm/SDM001/SDM001.component';
import { AuthGuard } from '../../../core/auth/auth-guard';
import { Routes } from '@angular/router';
import { SDM003Component } from './mengelola-sdm/SDM003/SDM003.component';
import { SDM008Component } from './SDM008/SDM008.component';
import { SDM004Component } from './SDM004/SDM004.component';
import { SDM002Component } from './mengelola-sdm/SDM002/SDM002.component';

export const SDM_ROUTES = [
    {
      path: 'sdm',
      children: [
        { path: 'SDM001', component: SDM001Component, canActivate: [AuthGuard] },
        { path: 'SDM002', component: SDM002Component, canActivate: [AuthGuard] },
        { path: 'SDM003', component: SDM003Component, canActivate: [AuthGuard] },
        { path: 'SDM004', component: SDM004Component, canActivate: [AuthGuard] },
        { path: 'SDM008', component: SDM008Component, canActivate: [AuthGuard] },
      ]
    }
  ];
