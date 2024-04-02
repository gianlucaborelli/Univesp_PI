import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenApiModel } from 'src/app/authentication/models/token-api.model';
import { environment } from 'src/environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt'
import { LoginModel } from 'src/app/authentication/models/login.model';
import { RegisterModel } from 'src/app/authentication/models/register.model';
import { UserStoreService } from './user-store.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUrl: String = environment.baseUrl;
  private userPayload: any;
  constructor(private http: HttpClient, private router: Router,private userStore: UserStoreService) {
    this.userPayload = this.decodedToken();
  }

  register(userObj: RegisterModel) {
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post<any>( url, userObj);
  }

  async login(loginObj: LoginModel)  {    
    const url = `${this.baseUrl}/auth/login`   

    var any = this.http.post<any>(url, loginObj);
    
    any.subscribe({
      next: (res) => {                     
        
        this.storeToken(res.accessToken!);
        this.storeRefreshToken(res.refreshToken!);
        let decodedValue = this.decodedToken();
        this.userStore.storeFullName(decodedValue.name);
        this.userStore.storeEmail(decodedValue.sub);
        this.userStore.storeRole(decodedValue.role);
        this.userStore.storeId(decodedValue.id);
      },
    })
    
    return any;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;    
    return jwtHelper.decodeToken(token);
  }

  getfullNameFromToken() {
    if (this.userPayload)
      return this.userPayload.name;
  }

  getRoleFromToken() {
    if (this.userPayload)
      return this.userPayload.role;
  }

  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
  }

}
