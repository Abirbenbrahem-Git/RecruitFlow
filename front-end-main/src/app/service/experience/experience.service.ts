import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { experience } from './experience';
import { Observable } from 'rxjs';
import { candidature } from '../candidature/candidature';
@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private httpClient:HttpClient) { }

  saveExperience(expFormData: experience[],token: string): Observable<experience[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.post<experience[]>("http://localhost:8099/experience", expFormData,{ headers: headers });
  }

  getExperiences(candidature:number,token: string): Observable<experience[]>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<experience[]>(`http://localhost:8099/experience/candidature/${candidature}`,{ headers: headers });
  }

}
