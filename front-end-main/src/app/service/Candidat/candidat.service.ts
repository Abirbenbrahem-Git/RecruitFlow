import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidat } from './Candidat';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  constructor(private httpClient: HttpClient) { }

  getAllCandidats(token:string): Observable<Candidat[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<Candidat[]>("http://localhost:8099/candidat/all",{ headers: headers });
  }

  saveCandidat(postData: any,token:string): Observable<Candidat> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.post<Candidat>("http://localhost:8099/candidat/add", postData,{ headers: headers });
  }

  updateCandidat(postData: any, id: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.put(`http://localhost:8099/candidat/${id}`, postData, { headers: headers });
  }
  deleteCandidat(id: number, token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.delete(`http://localhost:8099/candidat/delete/${id}`,{ headers: headers });
  }
  getUserDetails( token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get(`http://localhost:8099/candidat/details`,{ headers: headers });
  }
}
