import { Component } from '@angular/core';
import { AppModule } from './app.module';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [AppModule, RouterOutlet],
    templateUrl: './app.component.html'
})
export class AppComponent {
  constructor() {}
}
