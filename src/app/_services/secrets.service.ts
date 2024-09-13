import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecretsService {

  constructor(private http: HttpClient) { }

  BASE_URL: string = "http://localhost:3000";

  createSecret(secret: string, password: string, expiration: Date): Observable<any> {
    return this.http.post(`${this.BASE_URL}/gensecret`, {
      secret: secret,
      password: password,
      expiration: expiration
    });

  }

  getSecret(uuid: string, password: string) : Observable<any>{
    return this.http.post(`${this.BASE_URL}/secret/${uuid}`, {
      password: password
    })
  }
}
