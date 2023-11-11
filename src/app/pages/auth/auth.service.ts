import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_URL } from 'src/app/shared/constants';
import { Response } from 'src/app/shared/models/response';
import { LoginRequest, LoginResponse, User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = BASE_URL;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(loginRequest: LoginRequest) {
    return this.http.post<Response<LoginResponse>>(this.baseUrl + 'auth/login', loginRequest);
  }

  getCurrentUser(jwt: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    return this.http.get<Response<User>>(this.baseUrl + 'user/current', { headers });
  }

  getJWT() {
    return localStorage.getItem('token');
  }

  getFullName(){
    return localStorage.getItem('fullName');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
    this.router.navigate(['/login']);
  }
}
