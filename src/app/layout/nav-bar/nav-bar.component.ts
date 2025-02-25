import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportsComponent } from '../../pages/reports/reports.component';
import { DataManagementComponent } from '../../pages/data-management/data-management.component';

@Component({
  selector: 'app-nav-bar',
  imports: [NgbNavModule, ReportsComponent, DataManagementComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.less'
})
export class NavBarComponent {
  @ViewChild('campaignsTpl') campaignsTpl!: TemplateRef<any>;
  @ViewChild('reportsTpl') reportsTpl!: TemplateRef<any>;
  @ViewChild('dataManagementTpl') dataManagementTpl!: TemplateRef<any>;
  @ViewChild('eventsManagerTpl') eventsManagerTpl!: TemplateRef<any>;
  active = 1;
  routes = [
    { path: 'campaigns', name: 'CAMPAIGNS', template: this.campaignsTpl },
    { path: 'reports', name: 'REPORTS', template: this.reportsTpl },
    { path: 'data-management', name: 'DATA MANAGEMENT', template: this.dataManagementTpl },
    { path: 'events-manager', name: 'EVENTS MANAGER', template: this.eventsManagerTpl }
  ];
}
