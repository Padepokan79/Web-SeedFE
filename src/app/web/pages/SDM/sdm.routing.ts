import { SDM001Component } from './mengelola-sdm/SDM001/SDM001.component';
import { AuthGuard } from '../../../core/auth/auth-guard';
import { Routes } from '@angular/router';
import { SDM003Component } from './mengelola-sdm/SDM003/SDM003.component';
import { SDM006Component } from './SDM006/SDM006.component';
import { SDM007Component } from './SDM007/SDM007.component';
import { SDM008Component } from './SDM008/SDM008.component';
import { SDM004Component } from './SDM004/SDM004.component';
import { SDM002Component } from './mengelola-sdm/SDM002/SDM002.component';
import { SDM009Component } from './mengelola-sdm/SDM009/SDM009.component';
import { PreviewCvComponent } from './mengelola-sdm/SDM003/preview-cv/preview-cv.component';
import { SDM010Component } from './SDM010/SDM010.component';

export const SDM_ROUTES = [
    {
      path: 'sdm',
      children: [
        { path: 'SDM001', component: SDM001Component, canActivate: [AuthGuard] },
        { path: 'SDM002', component: SDM002Component, canActivate: [AuthGuard] },
        { path: 'SDM003', component: SDM003Component, canActivate: [AuthGuard] },
        { path: 'SDM004', component: SDM004Component, canActivate: [AuthGuard] },
        { path: 'SDM006', component: SDM006Component, canActivate: [AuthGuard] },
        { path: 'SDM007', component: SDM007Component, canActivate: [AuthGuard] },
        { path: 'SDM008', component: SDM008Component, canActivate: [AuthGuard] },
        { path: 'SDM009', component: SDM009Component, canActivate: [AuthGuard] },
        { path: 'SDM010', component: SDM010Component, canActivate: [AuthGuard] },
        { path: 'previewCV', component: PreviewCvComponent, canActivate: [AuthGuard] }
      ]
    }
  ];
