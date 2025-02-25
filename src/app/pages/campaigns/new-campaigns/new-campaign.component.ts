import { Component } from '@angular/core';
import { AppModule } from '../../../app.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-new-campaign',
    imports: [AppModule, MultiSelectModule, FormsModule, ReactiveFormsModule, RouterModule, DialogModule],
    templateUrl: './new-campaign.component.html',
    styleUrl: './new-campaign.component.less'
})
export class NewCampaignComponent {
  selectedCampaign: string[] = [];
  campaignOptions = [];
  visible: boolean = false;

  constructor(
    private router: Router,
  ) { }

  showDialog() {
    this.visible = true;
  }

  cancel() {
    this.router.navigate(['/campaigns']);
  }
}
