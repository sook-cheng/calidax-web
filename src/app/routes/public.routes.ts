import { Routes } from '@angular/router';
import { AuthComponent } from '../pages';

export const PUBLIC_ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: AuthComponent }
];
