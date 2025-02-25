import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadCSV(file: File, type: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.apiUrl}/upload-csv/${type}`, formData);
  }
}