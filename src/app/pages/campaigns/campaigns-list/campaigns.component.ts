import { Component, OnInit } from '@angular/core';
import { AppModule } from '../../../app.module';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { Router, RouterModule } from '@angular/router';
import { CampaignsService } from '../../../services';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-campaigns',
  imports: [AppModule, TableModule, DropdownModule, InputIconModule, IconFieldModule, FormsModule, InputTextModule, ButtonModule,
    TagModule, MenuModule, RouterModule, Menu],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.less'
})
export class CampaignsComponent implements OnInit {

  constructor(
    private router: Router,
    private service: CampaignsService,
  ) { }

  menuItems: MenuItem[] = [];
  selectedCampaign: any = null;
  selectedStatus: string | null = null; // Default to 'All' (null)
  selectedObjective: string | null = null; 
  searchText: string = ''; 
  filteredData: any[] = []; // Store filtered data
  statusOptions = [
    { label: 'Status', value: null }, // Show all if selected
    { label: 'Active', value: 'Active' },
    { label: 'Ended', value: 'Ended' },
    { label: 'Paused', value: 'Paused' }
  ];

  campaignObjective = [
    { label: 'Campaign Objective', value: null }, // Show all if selected
    { label: 'Branding', value: 'Branding' },
    { label: 'Leads', value: 'Leads' },
    { label: 'Traffic', value: 'Traffic' }
  ];
  data: any[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.service.getCSVData(null, null, null).subscribe(response => {
      this.data = response.records;
      this.filteredData = [...this.data]; // Default display
      this.filteredData = response.records.flat();
      this.updateMenuItemsForAll();
    });
  }
  
  updateMenuItemsForAll() {
    this.filteredData.forEach(campaign => {
      if (campaign.subCampaign && Array.isArray(campaign.subCampaign)) {
        campaign.subCampaign.forEach((sub: any) => {
          if (sub.status === 'Paused') {
            sub.menuItems = [
            {
              label: 'Active',
              icon: 'pi pi-play-circle',
              command: (event: any) => this.activeAndPauseCampaign('Active')
            }
            ];
          } else {
            sub.menuItems = [
            {
              label: 'Pause',
              icon: 'pi pi-pause',
              command: (event: any) => this.activeAndPauseCampaign('Paused')
            }
            ];
          }
        });
      }
    });
  }

  checkCampaignStatuses() {
    const today = new Date();
  
    this.data.forEach(campaign => {
      if (campaign.status === 'Paused') {
        return;
      }
  
      if (!campaign.status) {
        const campaignEndDate = new Date(campaign.endDate);
        campaign.status = campaignEndDate >= today ? 'Active' : 'Ended';
      }
    });
  }

  getTagSeverity(status: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'Active': return 'success';
      case 'Ended': return 'warn';
      case 'Paused': return 'info';
      default: return 'secondary';
    }
  }

  onMenuClick(event: any, campaign: any, menu: Menu) {
    this.selectedCampaign = campaign;
    menu.toggle(event);
  }

  activeAndPauseCampaign(status: string) {
    const updateRequest = {
      id: this.selectedCampaign.id,
      status: status,
      userId: localStorage.getItem('id'),
    };

    this.service.updateCampaign(updateRequest).subscribe(
      response => {
        this.loadData();
      },
      error => {
        alert(error?.message);
      }
    );
  }

  filterTable(): void {
    this.service.getCSVData(this.selectedStatus, this.selectedObjective, this.searchText ).subscribe(response => {
      this.data = response.records;
      this.filteredData = [...this.data];
      this.filteredData = response.records.flat();
    });
  }

  newCampaign() {
    this.router.navigate(['/campaigns/new-campaign']);
  }
}