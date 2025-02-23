import { Component } from '@angular/core';
import { AppModule } from '../../app.module';

@Component({
    selector: 'app-data-management',
    imports: [AppModule],
    templateUrl: './data-management.component.html',
    styleUrl: './data-management.component.less'
})
export class DataManagementComponent {
  selectedFile: File | null = null;

  constructor() {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  clearFile(fileInput: HTMLInputElement) {
    fileInput.value = ''; // Reset file input
    this.selectedFile = null; // Clear the selected file
  }
}
