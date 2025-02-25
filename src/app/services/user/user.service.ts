import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }

  updatePassword(userId: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/${userId}/update-password`, { password: newPassword });
  }
}