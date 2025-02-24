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

@Component({
  selector: 'app-campaigns',
  imports: [AppModule, TableModule, DropdownModule, InputIconModule, IconFieldModule, FormsModule, InputTextModule, ButtonModule,
    TagModule, MenuModule, RouterModule],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.less'
})
export class CampaignsComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  selectedStatus: string | null = null; // Default to 'All' (null)
  filteredData: any[] = []; // Store filtered data
  statusOptions = [
    { label: 'Status', value: null }, // Show all if selected
    { label: 'Active', value: 'Active' },
    { label: 'Ended', value: 'Ended' },
    { label: 'Paused', value: 'Paused' }
  ];

  campaignObjective = [
    { label: 'Campaign Objective', value: null }, // Show all if selected
    { label: 'Branding', value: 'branding' },
    { label: 'Leads', value: 'leads' },
    { label: 'Traffic', value: 'traffic' }
  ];

  data = [
    {
      id: 1,
      investmentName: 'INVESTMENT THEMATIC',
      status: '',
      endDate: '2024-12-31',
      campaigns: [
        { name: 'Programmatic' },
        { name: 'LinkedIn Ads' }
      ]
    },
    {
      id: 2,
      investmentName: 'THEMATIC',
      status: '',
      endDate: '2025-12-31',
      campaigns: [
        { name: 'Meta' },
        { name: 'LinkedIn Ads' }
      ]
    },
    {
      id: 3,
      investmentName: 'MDEC DE RANTAU - LEADS',
      status: 'Paused',
      endDate: '2025-12-31',
      campaigns: [
        { name: 'Programmatic' },
        { name: 'Meta' }
      ]
    },
  ];

  ngOnInit(): void {
    this.checkCampaignStatuses();
    this.filteredData = [...this.data]; // Initially, show all data
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
      case 'Paused': return 'info'; // 'warning' is not valid, use 'warn'
      default: return 'secondary'; // Use a valid fallback
    }
  }

  getMenuItems(campaign: any): MenuItem[] {
    return [
      { label: 'Pause', icon: 'pi pi-pause', command: () => this.pauseCampaign(campaign) }
    ];
  }

  pauseCampaign(campaign: any) {
    console.log(`Paused campaign: ${campaign.name}`);
    // Implement pause logic here
  }

  // Function to filter table based on status selection
  filterTable(): void {
    if (!this.selectedStatus) {
      this.filteredData = [...this.data]; // Show all if "All" is selected
    } else {
      this.filteredData = this.data.filter(campaign => campaign.status === this.selectedStatus);
    }
  }

  newCampaign() {
    this.router.navigate(['/campaigns/new-campaign']);
  }
}
