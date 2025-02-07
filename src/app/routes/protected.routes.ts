import { Routes } from '@angular/router';
import { ProtectedLayoutComponent } from '../layout/protected-layout/protected-layout.component';
import {
  DashboardComponent,
} from '../pages';

export const PROTECTED_ROUTES: Routes = [
  {
    path: '',
    component: ProtectedLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
];
