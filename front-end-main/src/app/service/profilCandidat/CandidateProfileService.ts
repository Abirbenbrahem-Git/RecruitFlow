import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CandidateProfileDTO } from './CandidateProfileDTO';

@Injectable({
  providedIn: 'root'
})
export class CandidateProfileService {
  private apiUrl = 'http://localhost:8099/api/CandidateProfile';

  constructor(private http: HttpClient) { }

  createCandidateProfile(profileData: CandidateProfileDTO, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/add`, profileData, { headers });
  }
}
