import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { user } from './user';
@Injectable({
  providedIn: 'root'
})
export class userService {
  private apiUrl = 'http://localhost:8099';

  constructor(private httpClient: HttpClient) {}

  updateUser(user: Partial<user>, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.httpClient.put(`${this.apiUrl}/updateUser}`, user, { headers });
  }
}
