import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { niveau } from './niveau';
import { offre } from '../offre/offre';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  constructor(private httpClient:HttpClient) { }

  getniveaus(): Observable<niveau[]>{
    return this.httpClient.get<niveau[]>("http://localhost:8099/offre/niveau");
  }

  getnomss(): Observable<string[]>{
    return this.httpClient.get<string[]>("http://localhost:8099/offre/niveau/noms");
  }

  getOffreByNivveauList(nom:string): Observable<offre[]>{
    return this.httpClient.get<offre[]>(`http://localhost:8099/offre/niveau/${nom}`);
  }
}
