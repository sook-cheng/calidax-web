import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { CampaignsService, SuccessFailToastService } from '../../../services';
import { Menu } from 'primeng/menu';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapCalendar3, bootstrapSearch, bootstrapXLg } from '@ng-icons/bootstrap-icons';
import { SuccessFailToastComponent } from '../../shared';

@Component({
  selector: 'app-campaigns',
  imports: [AppModule, TableModule, DropdownModule, InputIconModule, IconFieldModule, FormsModule, InputTextModule, ButtonModule,
    TagModule, MenuModule, RouterModule, Menu, NgbDatepickerModule, NgIcon, IconFieldModule, SuccessFailToastComponent],
  providers: [provideIcons({ bootstrapCalendar3, bootstrapSearch, bootstrapXLg }), SuccessFailToastService],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.less'
})
export class CampaignsComponent implements OnInit {
  calendar = inject(NgbCalendar);
  formatter = inject(NgbDateParserFormatter);
  toastService = inject(SuccessFailToastService);

  constructor(
    private router: Router,
    private service: CampaignsService,
  ) { }

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = this.calendar.getToday();
  fromDateStr: string | null = null;
  toDateStr: string | null = null;
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

  
  @ViewChild('failedTpl') failedTpl!: TemplateRef<any>;

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
        this.toastService.show({ template: this.failedTpl, classname: 'bg-danger text-light', header: 'Fail' });
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

  onDateSelection(date: NgbDate) {
    const fromDate = this.formatter.parse(this.fromDateStr!);
    const toDate = this.formatter.parse(this.toDateStr!);
    const formattedDate = this.formatter.format(date);

    if (!fromDate && !toDate) {
      this.fromDateStr = formattedDate;
    } else if (fromDate && !toDate && date && date.after(fromDate)) {
      this.toDateStr = formattedDate;
    } else {
      this.toDateStr = null;
      this.fromDateStr = formattedDate
    }
  }

  isHovered(date: NgbDate) {
    const fromDate = this.formatter.parse(this.fromDateStr!);
    const toDate = this.formatter.parse(this.toDateStr!);
    return (
      fromDate && !toDate && this.hoveredDate && date.after(fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    const fromDate = this.formatter.parse(this.fromDateStr!);
    const toDate = this.formatter.parse(this.toDateStr!);
    return toDate && date.after(fromDate) && date.before(toDate);
  }

  isRange(date: NgbDate) {
    const fromDate = this.formatter.parse(this.fromDateStr!);
    const toDate = this.formatter.parse(this.toDateStr!);
    return (
      date.equals(fromDate) ||
      (toDate && date.equals(toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(event: Event, source: string): NgbDate | null {
    const input = event.target as HTMLInputElement;
    const currentValue: any = this.formatter.parse(source === 'FROM' ? this.fromDateStr! : this.toDateStr!);
    const parsed = this.formatter.parse(input.value);

    // Set dates
    const fromParts = this.fromDateStr!.split('-');
    this.fromDate = new NgbDate(parseInt(fromParts[0]), parseInt(fromParts[1]), parseInt(fromParts[2]));

    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  filterByDate() {
    if (!this.fromDateStr || !this.toDateStr) return;
    this.filteredData = this.filteredData.filter(data => new Date(data.earliestStartDate) <= new Date(this.fromDateStr!) && 
      new Date(data.latestEndDate) >= new Date(this.toDateStr!)
    );
  }

  clearFilter() {
    this.fromDateStr = null;
    this.toDateStr = null;
    this.loadData();
  }
}