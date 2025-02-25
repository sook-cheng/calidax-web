import { Routes } from '@angular/router';
import { ProtectedLayoutComponent } from '../layout/protected-layout/protected-layout.component';
import {
  ReportsComponent,
  DataManagementComponent,
  CampaignsComponent,
  NewCampaignComponent,
  EventsManagerComponent,
  ProfileComponent,
} from '../pages';

export const PROTECTED_ROUTES: Routes = [
  {
    path: '',
    component: ProtectedLayoutComponent,
    children: [
      { path: '', redirectTo: 'campaigns', pathMatch: 'full' },
      { path: 'reports', component: ReportsComponent },
      { path: 'data-management', component: DataManagementComponent },
      { path: 'campaigns', component: CampaignsComponent },
      { path: 'campaigns/new-campaign', component: NewCampaignComponent },
      { path: 'events-manager', component: EventsManagerComponent },
      { path: 'profile', component: ProfileComponent},
    ],
  },
];
