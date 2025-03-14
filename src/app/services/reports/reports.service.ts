import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { Report } from '../../interfaces';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../../directives';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface SearchResult {
	reports: Report[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string | number | Date, v2: string | number | Date) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(reports: Report[], column: SortColumn, direction: string): Report[] {
	if (direction === '' || column === '') {
		return reports;
	} else {
		return [...reports].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}

function matches(report: Report, term: string) {
	return (
		report.client.toLowerCase().includes(term.toLowerCase())
	);
}

@Injectable({ providedIn: 'root' })
export class ReportService {
	private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _reports$ = new BehaviorSubject<Report[]>([]);
	private _total$ = new BehaviorSubject<number>(0);

	private _state: State = {
		page: 1,
		pageSize: 10,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
	};
    reports: Report[] = [];

	constructor(private http: HttpClient) {
        this.http.get<Report[]>(`${environment.apiUrl}/all-reports`).subscribe(r => this.reports = r);
		this._search$
			.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false)),
			)
			.subscribe((result) => {
				this._reports$.next(result.reports);
				this._total$.next(result.total);
			});

		this._search$.next();
	}

	get reports$() {
		return this._reports$.asObservable();
	}
	get total$() {
		return this._total$.asObservable();
	}
	get loading$() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._state.page;
	}
	get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}

	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

	private _search(): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		// 1. sort
		let reports = sort(this.reports, sortColumn, sortDirection);

		// 2. filter
		reports = reports.filter((report) => matches(report, searchTerm));
		const total = reports.length;

		// 3. paginate
		reports = reports.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ reports, total });
	}
}