import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { diplome } from './diplome';

@Injectable({
  providedIn: 'root'
})
export class DiplomeService {

  constructor(private httpClient:HttpClient) { }

  saveDiplome(dipFormData: diplome[],token: string): Observable<diplome[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<diplome[]>("http://localhost:8099/api/v3/diplome", dipFormData,{ headers: headers });
  }

  getDiplomes(candidature:number,token: string): Observable<diplome[]>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<diplome[]>(`http://localhost:8099/api/v3/diplome/candidature/${candidature}`,{ headers: headers });
  }
}
