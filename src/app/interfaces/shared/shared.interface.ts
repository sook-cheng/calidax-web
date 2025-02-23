import { TemplateRef } from "@angular/core";

export interface SuccessFailToast {
	template: TemplateRef<any>;
	classname?: string;
	delay?: number;
    header?: string;
}