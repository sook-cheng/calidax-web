import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { SuccessFailToastService } from '../../../services';

@Component({
  selector: 'app-success-fail-toast',
  imports: [NgbToastModule, NgTemplateOutlet],
  templateUrl: './success-fail-toast.component.html',
  styleUrl: './success-fail-toast.component.less',
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class SuccessFailToastComponent {
  toastService = inject(SuccessFailToastService);
}
