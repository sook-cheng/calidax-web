import { Component, inject, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerModule, NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AppModule } from '../../app.module';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapCalendar3, bootstrapFileEarmarkPdf } from '@ng-icons/bootstrap-icons';
import { ReportService, SuccessFailToastService, UserService } from '../../services';
import { Observable } from 'rxjs';
import { Report } from '../../interfaces';
import { NgbdSortableHeader, SortEvent } from '../../directives';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SuccessFailToastComponent } from '../shared';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { AccessDeniedPageComponent } from '../access-denied-page/access-denied-page.component';

@Component({
  selector: 'app-reports',
  imports: [AppModule, NgbDatepickerModule, ReactiveFormsModule, NgIcon, NgbHighlight, NgbdSortableHeader, NgbPaginationModule, SuccessFailToastComponent,
    TagModule, TableModule, ButtonModule, InputIconModule, IconFieldModule, AccessDeniedPageComponent],
  providers: [provideIcons({ bootstrapCalendar3, bootstrapFileEarmarkPdf }), ReportService, SuccessFailToastService, HttpClient, UserService],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.less'
})
export class ReportsComponent implements OnInit {
  calendar = inject(NgbCalendar);
  formatter = inject(NgbDateParserFormatter);
  toastService = inject(SuccessFailToastService);
  userService = inject(UserService);

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = this.calendar.getToday();
  toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
  clientOptions = ['MDEC'];
  successMsgVisible = false;
  failMsgVisible = false;
  isLoading = true;
  isSubmitted = false;
  isAdmin = false;
  tableData: any[] = [];

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
  @ViewChild('noRecordTpl') noRecordTpl!: TemplateRef<any>;

  constructor(public service: ReportService, private http: HttpClient) {
    this.reports$ = service.reports$;
    this.total$ = service.total$;
  }

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
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
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

  getBadgeClass(status: string, parentStatus?: string): string {
    if (!status || status.length === 0) {
      switch (parentStatus) {
        case 'Active': return 'p-tag p-tag-success';
        case 'Ended': return 'p-tag p-tag-warn';
        case 'Paused': return 'p-tag p-tag-info';
        default: return 'p-tag p-tag-secondary';
      }
    }
    switch (status) {
      case 'Active': return 'p-tag p-tag-success';
      case 'Ended': return 'p-tag p-tag-warn';
      case 'Paused': return 'p-tag p-tag-info';
      default: return 'p-tag p-tag-secondary';
    }
  }

  generatePDFReport(id: number, filename: string) {
    const element = document.getElementById('table-container');

    if (!element) {
      console.error('Table container not found.');
      return;
    }

    html2canvas(element, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190; // A4 width in mm (leaving some margin)
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10; // Initial margin

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${filename}.pdf`);
      const pdfBlob = pdf.output('blob');

      // HTTP Post - Upload to storage
      const formData = new FormData();
      formData.append('file', pdfBlob, `${filename}.pdf`);
      
      this.http.post<any>(`${environment.apiUrl}/upload-report/${id}`, formData).subscribe(res => {
        if (res.message === "UPLOAD_SUCCESSFUL") {
          this.toastService.show({ template: this.successTpl, classname: 'bg-success text-light', header: 'Success' });
        }
        else {
          this.toastService.show({ template: this.failedTpl, classname: 'bg-danger text-light', header: 'Fail' });
        }
      });
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.dateFilterForm.valid) {
      const body = {
        client: this.dateFilterForm.value.client,
        startDate: this.dateFilterForm.value.fromDate + 'T16:00:00.000Z',
        endDate: this.dateFilterForm.value.toDate + 'T23:59:59.999Z',
        userId: localStorage.getItem('id'),
      }

      this.http.post<any>(`${environment.apiUrl}/filter-report`, body).subscribe(res => {
        if (res.records && res.records.length > 0) {
          this.tableData = res.records;
          setTimeout(() => {
            const docName = `${this.dateFilterForm.value.client ?? 'null'}_${this.dateFilterForm.value.fromDate ?? 'null'}_${this.dateFilterForm.value.toDate ?? 'null'}`
            this.generatePDFReport(res.reportId, docName);
          }, 1000);
        }
        else if (res.records && res.records.length === 0) {
          this.toastService.show({ template: this.noRecordTpl, classname: 'bg-danger text-light', header: 'Fail' });
        }
        else {
          this.toastService.show({ template: this.failedTpl, classname: 'bg-danger text-light', header: 'Fail' });
        }
      });
    }
  }
}
