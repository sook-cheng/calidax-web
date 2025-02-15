import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-protected-layout',
    imports: [RouterOutlet],
    templateUrl: './protected-layout.component.html',
    styleUrl: './protected-layout.component.less'
})
export class ProtectedLayoutComponent {

  constructor() {}
}
