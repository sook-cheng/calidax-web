import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getCSVData(status: string | null, objective: string | null, searchText: string | null): Observable<any> {
      let params: any = {};
      if (status && status !== 'All') {
        params.status = status;
      }
      if (objective && objective !== 'All') {
        params.objective = objective;
      }
      if (searchText && searchText !== '') {
        params.searchText = searchText;
      }

      return this.http.get<any>(`${this.apiUrl}/fetch-csv-record`, { params });
    }

    updateCampaign(updateRequest: { id: string, status: string }) {
      return this.http.post<any>(`${this.apiUrl}/update-campaign`, updateRequest);
    }
}