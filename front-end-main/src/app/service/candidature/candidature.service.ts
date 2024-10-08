import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { candidature } from './candidature';
@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  private baseUrl = 'http://localhost:8099/candidature';
  constructor(private httpClient:HttpClient) { }

  createCandidature(candidatureData: FormData, token: string): Observable<candidature> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<candidature>(`${this.baseUrl}`, candidatureData, { headers: headers });
  }

  getAllCandidatures(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get("http://localhost:8099/candidature/candidat/all",{ headers: headers });
  }
  getAllCandidaturess(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get("http://localhost:8099/candidature/employeur/all",{ headers: headers });
  }

  downloadFile(id: number): Observable<any> {

    return this.httpClient.get(`http://localhost:8099/candidature/${id}/download`, { responseType: 'blob'});
  }
  public accpeter(id_candidature:number,token:string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get(`http://localhost:8099/candidature/accepter/${id_candidature}`,{ headers: headers });
  }

  public refuser(id_candidature:number,token:string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get(`http://localhost:8099/candidature/refuser/${id_candidature}`,{ headers: headers });
  }
}
