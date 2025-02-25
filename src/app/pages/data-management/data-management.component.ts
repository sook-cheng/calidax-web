import { Component } from '@angular/core';
import { AppModule } from '../../app.module';
import { DataManagementService } from '../../services';

interface CSVUploadResponse {
  message: string;
  records: any[];
}

@Component({
    selector: 'app-data-management',
    imports: [AppModule],
    templateUrl: './data-management.component.html',
    styleUrl: './data-management.component.less'
})

export class DataManagementComponent {
  selectedFile: File | null = null;

  constructor(
    private service: DataManagementService,
  ) {}

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

  uploadCSV() {
    if (!this.selectedFile) return;

    this.service.uploadCSV(this.selectedFile, this.selectedFile.name).subscribe({
      next: (response) => {
        alert('Upload successful!');
        this.clearFile(document.getElementById('fileInput') as HTMLInputElement);
      },
      error: (err) => {
        alert(err.error?.message);
      }
    });
  }
}
