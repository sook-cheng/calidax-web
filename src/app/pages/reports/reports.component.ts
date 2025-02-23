import { Component, inject, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerModule, NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AppModule } from '../../app.module';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapCalendar3, bootstrapFileEarmarkPdf } from '@ng-icons/bootstrap-icons';
import { ReportService, SuccessFailToastService } from '../../services';
import { Observable } from 'rxjs';
import { Report } from '../../interfaces';
import { NgbdSortableHeader, SortEvent } from '../../directives';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SuccessFailToastComponent } from '../shared';

@Component({
  selector: 'app-reports',
  imports: [AppModule, NgbDatepickerModule, ReactiveFormsModule, NgIcon, NgbHighlight, NgbdSortableHeader, NgbPaginationModule, SuccessFailToastComponent],
  providers: [provideIcons({ bootstrapCalendar3, bootstrapFileEarmarkPdf }), ReportService, SuccessFailToastService, HttpClient],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.less'
})
export class ReportsComponent {
  calendar = inject(NgbCalendar);
  formatter = inject(NgbDateParserFormatter);
  toastService = inject(SuccessFailToastService);

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = this.calendar.getToday();
  toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
  clientOptions = ['Client 1', 'Client 2', 'Client 3'];
  successMsgVisible = false;
  failMsgVisible = false;

  dateFilterForm: FormGroup = new FormGroup({
    client: new FormControl<string | null>(null, [Validators.required]),
    fromDate: new FormControl<string | null>(this.formatter.format(this.fromDate), [Validators.required]),
    toDate: new FormControl<string | null>(this.formatter.format(this.toDate), [Validators.required])
  });

  reports$: Observable<Report[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;
  @ViewChild('successTpl') successTpl!: TemplateRef<any>;
  @ViewChild('failedTpl') failedTpl!: TemplateRef<any>;

  constructor(public service: ReportService, private http: HttpClient) {
    this.reports$ = service.reports$;
    this.total$ = service.total$;
  }

  get client() {
    return this.dateFilterForm.get('client');
  }
  get startDate() {
    return this.dateFilterForm.get('fromDate');
  }
  get endDate() {
    return this.dateFilterForm.get('toDate');
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  onDateSelection(date: NgbDate) {
    const fromDate = this.formatter.parse(this.dateFilterForm.value.fromDate);
    const toDate = this.formatter.parse(this.dateFilterForm.value.toDate);
    const formattedDate = this.formatter.format(date);

    if (!fromDate && !toDate) {
      this.dateFilterForm.patchValue({
        fromDate: formattedDate
      });
    } else if (fromDate && !toDate && date && date.after(fromDate)) {
      this.dateFilterForm.patchValue({
        toDate: formattedDate
      });
    } else {
      this.dateFilterForm.patchValue({
        toDate: null,
        fromDate: formattedDate
      });
    }
  }

  isHovered(date: NgbDate) {
    const fromDate = this.formatter.parse(this.dateFilterForm.value.fromDate);
    const toDate = this.formatter.parse(this.dateFilterForm.value.toDate);
    return (
      fromDate && !toDate && this.hoveredDate && date.after(fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    const fromDate = this.formatter.parse(this.dateFilterForm.value.fromDate);
    const toDate = this.formatter.parse(this.dateFilterForm.value.toDate);
    return toDate && date.after(fromDate) && date.before(toDate);
  }

  isRange(date: NgbDate) {
    const fromDate = this.formatter.parse(this.dateFilterForm.value.fromDate);
    const toDate = this.formatter.parse(this.dateFilterForm.value.toDate);
    return (
      date.equals(fromDate) ||
      (toDate && date.equals(toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(event: Event, source: string): NgbDate | null {
    const input = event.target as HTMLInputElement;
    const currentValue: any = this.formatter.parse(source === 'FROM' ? this.dateFilterForm.value.fromDate : this.dateFilterForm.value.toDate);
    const parsed = this.formatter.parse(input.value);

    // Set dates
    this.fromDate = this.dateFilterForm.value.fromDate;
    this.toDate = this.dateFilterForm.value.toDate;

    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  onSubmit() {
    const body = {
      client: this.dateFilterForm.value.client,
      startDate: this.dateFilterForm.value.fromDate + 'T16:00:00.000Z',
      endDate: this.dateFilterForm.value.toDate + 'T23:59:59.999Z'
    }
    // this.http.post<any>(`${environment.apiUrl}/filter-report`, body).subscribe(res => {
    //   if (res.status === 201) {
    //     const body = res.body;
    //     // TODO: Generate PDF file for data returned
    //     const formData = new FormData();
    //     // formData.append('file', file);
    //     const headers = new HttpHeaders({
    //       'enctype': 'multipart/form-data'
    //     });
    //     this.http.post<any>(`${environment.apiUrl}/upload-report/${body.docName}`, formData, { headers }).subscribe(res => {
    //       if (res.status === 201) {
    //         this.toastService.show({ template: this.successTpl, classname: 'bg-success text-light', header: 'Success' });
    //       }
    //       else {
    //         this.toastService.show({ template: this.failedTpl, classname: 'bg-danger text-light', header: 'Fail' });
    //       }
    //     });
    //   }
    //   else {
    //     this.toastService.show({ template: this.failedTpl, classname: 'bg-danger text-light', header: 'Fail' });
    //   }
    // });

    this.toastService.show({ template: this.successTpl, classname: 'bg-success text-light', header: 'Success' });
  }
}
