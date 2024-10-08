import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8099/api/v1/auth"; // Correction: remove array brackets []

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient) { }

  register(registerCandidatRequest: any): Observable<any> {
    return this.http.post(BASE_URL + '/register/candidat', registerCandidatRequest); // Utilisez /register/candidat
  }

  register1(registerEmployeurRequest: any): Observable<any> {
    return this.http.post(BASE_URL + '/register/employeur', registerEmployeurRequest); // Utilisez /register/employeur
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(BASE_URL + '/reset-password', { email });
  }

  login(authenticationRequest: any): Observable<any> {
    return this.http.post(BASE_URL + '/authenticate', authenticationRequest); // Utilisez /authenticate
  }

  private createAuthorizationHeader() {
    const jwtToken = localStorage.getItem('refresh_token');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      );
    } else {
      console.log("JWT token not found in local storage");
    }
    return null;
  }

  getData() {
    return this.http.get(`${BASE_URL}/endpoint`);
  }


}
