import { Routes } from '@angular/router';
import { ProtectedLayoutComponent } from '../layout/protected-layout/protected-layout.component';
import {
  DashboardComponent,
  ReportsComponent,
} from '../pages';

export const PROTECTED_ROUTES: Routes = [
  {
    path: '',
    component: ProtectedLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'reports', component: ReportsComponent },
    ],
  },
];
