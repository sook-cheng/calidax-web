import { Component } from '@angular/core';
import { bootstrapCheckCircleFill } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { AppModule } from '../../app.module';

@Component({
  selector: 'app-events-manager',
  imports: [AppModule, NgIcon],
  providers: [provideIcons({ bootstrapCheckCircleFill })],
  templateUrl: './events-manager.component.html',
  styleUrl: './events-manager.component.less'
})
export class EventsManagerComponent {
  text: string = 'Initializing';
  isFadingOut: boolean = false;
  isLoading: boolean = true;
  isFillingIcon: boolean = false; // Control icon slowly filled animation

  constructor() {
    setTimeout(() => {
      this.fadeOutAndChangeText("Connecting to the server");
    }, 2000);

    setTimeout(() => {
      this.fadeOutAndChangeText("Fetching the data");
    }, 5000);

    setTimeout(() => {
      this.fadeOutAndChangeText("Generating the statistics");
    }, 10000);

    setTimeout(() => {
      this.fadeOutAndChangeText("Almost there");
    }, 25000);

    setTimeout(() => {
      this.fadeOutAndChangeText("Done!");
      setTimeout(() => {
        this.isLoading = false;
        this.isFillingIcon = true; // Start the filling icon animation
      }, 1000);
    }, 30000);
  }

  fadeOutAndChangeText(t: string) {
    this.isFadingOut = true; // Apply fade out effect
    setTimeout(() => {
      this.text = t;
      this.isFadingOut = false; // Apply fade in effect
    }, 1000); // Matches the fade out duration
  }
}
