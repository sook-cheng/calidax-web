import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CampaignsComponent, ReportsComponent, DataManagementComponent, EventsManagerComponent } from '../../pages';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [NgbNavModule, CampaignsComponent, ReportsComponent, DataManagementComponent, EventsManagerComponent, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.less'
})
export class NavBarComponent implements OnInit {
  @ViewChild('campaignsTpl') campaignsTpl!: TemplateRef<any>;
  @ViewChild('reportsTpl') reportsTpl!: TemplateRef<any>;
  @ViewChild('dataManagementTpl') dataManagementTpl!: TemplateRef<any>;
  @ViewChild('eventsManagerTpl') eventsManagerTpl!: TemplateRef<any>;
  active = 1;
  routes = [
    { index: 1, path: 'campaigns', name: 'CAMPAIGNS', template: this.campaignsTpl },
    { index: 2, path: 'reports', name: 'REPORTS', template: this.reportsTpl },
    { index: 3, path: 'data-management', name: 'DATA MANAGEMENT', template: this.dataManagementTpl },
    { index: 4, path: 'events-manager', name: 'EVENTS MANAGER', template: this.eventsManagerTpl }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const route = this.router.url;
    const index = this.routes.findIndex(x => x.path === route.substring(1));
    this.active = index + 1;
  }
}
