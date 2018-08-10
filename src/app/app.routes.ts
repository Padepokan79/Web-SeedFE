import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full'},
  { path: '**', redirectTo: '' },
];
