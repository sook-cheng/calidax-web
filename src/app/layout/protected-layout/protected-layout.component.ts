import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapGear, bootstrapQuestionCircle } from '@ng-icons/bootstrap-icons';

@Component({
    selector: 'app-protected-layout',
    imports: [RouterOutlet, NavBarComponent, NgbDropdownModule, NgIcon],
    providers: [provideIcons({ bootstrapGear, bootstrapQuestionCircle })],
    templateUrl: './protected-layout.component.html',
    styleUrl: './protected-layout.component.less'
})
export class ProtectedLayoutComponent {

  constructor() {}
}
