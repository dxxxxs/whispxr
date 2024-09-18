import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecretsService {

  constructor(private http: HttpClient) { }

  BASE_URL: string = "https://whispxr-back.onrender.com";
  // BASE_URL: string = "http://localhost:3000";

  createSecret(secret: string, password: string, expiration: Date): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.BASE_URL}/gensecret`, {
      secret: secret,
      password: password,
      expiration: expiration
    }, { observe: 'response' });

  }

  getSecret(uuid: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.BASE_URL}/secret/${uuid}`, {
      password: password
    }, { observe: 'response' });
  }

  healthCheck(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.BASE_URL}/api/health-check`, { observe: 'response' });
  }
}
