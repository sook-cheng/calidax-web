import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppModule } from '../../app.module';
import { DataManagementService, SuccessFailToastService, UserService } from '../../services';
import { SuccessFailToastComponent } from '../shared';
import { AccessDeniedPageComponent } from '../access-denied-page/access-denied-page.component';

interface CSVUploadResponse {
  message: string;
  records: any[];
}

@Component({
    selector: 'app-data-management',
    imports: [AppModule, SuccessFailToastComponent, AccessDeniedPageComponent],
    templateUrl: './data-management.component.html',
    styleUrl: './data-management.component.less'
})

export class DataManagementComponent implements OnInit {
  selectedFile: File | null = null;
  isAdmin: boolean = false;

  @ViewChild('successTpl') successTpl!: TemplateRef<any>;
  @ViewChild('failedTpl') failedTpl!: TemplateRef<any>;
  @ViewChild('invalidFileTpl') invalidFileTpl!: TemplateRef<any>;

  constructor(
    private service: DataManagementService,
    private toastService: SuccessFailToastService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('id');
    this.userService.getUserById(userId!).subscribe({
      next: (data) => {
        this.isAdmin = data?.isAdmin;
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
  }

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
    if (this.selectedFile.type !== 'text/csv') {
      this.toastService.show({ template: this.invalidFileTpl, classname: 'bg-danger text-light', header: 'Fail' });
    }
    this.service.uploadCSV(this.selectedFile, 'LOOKER_STUDIO', localStorage.getItem('id')).subscribe({
      next: (response) => {
          this.toastService.show({ template: this.successTpl, classname: 'bg-success text-light', header: 'Success' });
        this.clearFile(document.getElementById('fileInput') as HTMLInputElement);
      },
      error: (err) => {
          this.toastService.show({ template: this.failedTpl, classname: 'bg-danger text-light', header: 'Fail' });
      }
    });
  }
}
