import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { gouvernorat } from './gouvernorat';
import { HttpClient } from '@angular/common/http';
import { offre } from '../offre/offre';

@Injectable({
  providedIn: 'root'
})
export class GouvernoratService {

  constructor(private httpClient:HttpClient) { }

  getgouvernorats(): Observable<gouvernorat[]>{
    return this.httpClient.get<gouvernorat[]>("http://localhost:8099/gouvernorat");
  }
  getgouvernoratss(): Observable<gouvernorat[]>{
    return this.httpClient.get<gouvernorat[]>("http://localhost:8099/api/v1/auth/gouvernoratss");
  }
  getGouvernoratNames(): Observable<string[]>{
    return this.httpClient.get<string[]>("http://localhost:8099/gouvernorat/noms");
  }

  getGouvernorats(): Observable<gouvernorat[]> {
    return this.httpClient.get<gouvernorat[]>("http://localhost:8099/offre/gouvernorat");
  }
  getnoms(): Observable<string[]>{
    return this.httpClient.get<string[]>("http://localhost:8099/offre/gouvernorat/noms");
  }

  getOffreByGovernoratList(nom:string): Observable<offre[]>{
    return this.httpClient.get<offre[]>(`http://localhost:8099/offre/gouvernorat/${nom}`);
  }
}
