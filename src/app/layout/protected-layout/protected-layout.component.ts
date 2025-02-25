import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
    selector: 'app-protected-layout',
    imports: [RouterOutlet, NavBarComponent],
    templateUrl: './protected-layout.component.html',
    styleUrl: './protected-layout.component.less'
})
export class ProtectedLayoutComponent {

  constructor() {}
}
