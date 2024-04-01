import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, public router: Router) { }

  canActivate():boolean{
    if(this.auth.isLoggedIn()){
      return true
    }else{      
      this.router.navigate(['login'])
      return false;
    }
  }
}