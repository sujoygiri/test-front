

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Global {
  BASE_URL = 'https://test-back-production-762d.up.railway.app';

  constructor(private http: HttpClient) {}

  signup(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/user/signup`, data, { withCredentials: true});
  }

  signin(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/user/signin`, data, { withCredentials: true });
  }

  getUserData(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/user/data`, { withCredentials: true });
  }
}
