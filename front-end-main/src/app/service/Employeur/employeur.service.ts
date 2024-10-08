import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import { Employeur } from './employeur';

@Injectable({
  providedIn: 'root'
})
export class EmployeurService {

  constructor(private httpClient: HttpClient) { }

  getAllEmployeurs(token: string): Observable<Employeur[]>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<Employeur[]>("http://localhost:8099/employeur/all",{ headers: headers });
  }
  saveEmployeur(postData: any,token: string): Observable<Employeur> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.post<Employeur>("http://localhost:8099/employeur/add", postData,{ headers: headers });
  }
  updateEmployeur(postData: any, id: number,token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.put(`http://localhost:8099/employeur/${id}`, postData,{ headers: headers });
  }
  deleteEmployeur(id:number,token: string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.delete(`http://localhost:8099/employeur/delete/${id}`,{ headers: headers });
  }
  getUserDetails(token:string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<any>('http://localhost:8099/employeur/details',{ headers: headers });
  }
}
