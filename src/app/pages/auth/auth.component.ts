import { Component } from '@angular/core';
import { AppModule } from '../../app.module';

@Component({
    selector: 'app-auth',
    imports: [AppModule],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.less'
})
export class AuthComponent {

  constructor() { }

  async login() {}
}
