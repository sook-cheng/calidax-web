import { Component } from '@angular/core';
import { AppModule } from '../../app.module';

@Component({
    selector: 'app-dashboard',
    imports: [AppModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.less'
})
export class DashboardComponent {

  constructor() {}
}
