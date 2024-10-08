import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { offre } from './offre';
import { Observable } from 'rxjs';
import { gouvernorat } from '../gouvernorat/gouvernorat';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  constructor(private httpClient:HttpClient) { }

  getoffres(token: string): Observable<offre[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    console.log(headers);
    return this.httpClient.get<offre[]>('http://localhost:8099/offre/all', { headers: headers });

  }
  getoffress(token: string): Observable<offre[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    console.log(headers);
    return this.httpClient.get<offre[]>('http://localhost:8099/offre/offres/all', { headers: headers });

  }
  saveOffre(postData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });

    return this.httpClient.post("http://localhost:8099/offre", postData, { headers: headers });
  }
  deleteOffre(id_offre:number, token: string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });


    console.log(headers);

    return this.httpClient.delete(`http://localhost:8099/offre/id/${id_offre}`, { headers: headers });
  }



  updateOffre(postData: any, id_offre: number,token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    console.log(headers);

    return this.httpClient.put(`http://localhost:8099/offre/${id_offre}`, postData, { headers: headers });
  }
  getOffreByGouvernoratNiveauList(gouvernorat: string, niveau: string): Observable<offre[]> {
    return this.httpClient.get<offre[]>(`http://localhost:8099/NiveauGouvernorat/${gouvernorat}/${niveau}`);
  }
}
