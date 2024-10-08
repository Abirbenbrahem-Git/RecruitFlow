import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { civilite } from './civilite';
import { HttpClient } from '@angular/common/http';

const BASE_URL = "http://localhost:8099";
@Injectable({
  providedIn: 'root'
})
export class CiviliteService {
/**/
  constructor(private httpClient:HttpClient) { }

  getcivilites(): Observable<civilite[]>{
    return this.httpClient.get<civilite[]>(BASE_URL+"/civilite");
  }
//
  getnoms(): Observable<string[]>{
    return this.httpClient.get<string[]>(BASE_URL+"/civilite/noms");
  }
  getcivilitess(): Observable<civilite[]>{
    return this.httpClient.get<civilite[]>(BASE_URL+"/api/v1/auth/civilites");
  }
/**/
  getnomss(): Observable<string[]>{
    return this.httpClient.get<string[]>(BASE_URL+"/api/v1/auth/civilites/noms");
  }

  getOffreByCiviliteList(nom:string): Observable<civilite[]>{
    return this.httpClient.get<civilite[]>(BASE_URL+`/candidat/civilite/${nom}`);
  }
}
