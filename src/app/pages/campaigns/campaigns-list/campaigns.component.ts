import { Component } from '@angular/core';
import { AppModule } from '../../../app.module';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-campaigns',
  imports: [AppModule, TableModule, MultiSelectModule, InputIconModule, IconFieldModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.less'
})
export class CampaignsComponent {

  constructor() { }

  data = [
    {
      id: 1,
      investmentName: 'INVESTMENT THEMATIC',
      campaigns: [
        { name: 'Programmatic' },
        { name: 'LinkedIn Ads' }
      ]
    },
    {
      id: 2,
      investmentName: 'THEMATIC',
      campaigns: [
        { name: 'Meta' },
        { name: 'LinkedIn Ads' }
      ]
    }
  ];
}
