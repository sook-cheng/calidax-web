import { Injectable } from '@angular/core';
import { SuccessFailToast } from '../../interfaces';

@Injectable({ providedIn: 'root' })
export class SuccessFailToastService {
	toasts: SuccessFailToast[] = [];

	show(toast: SuccessFailToast) {
		this.toasts.push(toast);
	}

	remove(toast: SuccessFailToast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}