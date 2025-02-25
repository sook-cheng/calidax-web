import { Routes } from '@angular/router';
import { ProtectedLayoutComponent } from '../layout/protected-layout/protected-layout.component';
import {
  DashboardComponent,
  ReportsComponent,
  DataManagementComponent,
  CampaignsComponent
} from '../pages';
import { NewCampaignComponent } from '../pages/campaigns/new-campaigns/new-campaign.component';

export const PROTECTED_ROUTES: Routes = [
  {
    path: '',
    component: ProtectedLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'campaigns', component: DashboardComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'data-management', component: DataManagementComponent },
      { path: 'campaigns', component: CampaignsComponent },
      { path: 'campaigns/new-campaign', component: NewCampaignComponent},
    ],
  },
];
