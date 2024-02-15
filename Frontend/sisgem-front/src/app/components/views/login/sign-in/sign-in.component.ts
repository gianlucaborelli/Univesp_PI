import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { LoginModel } from 'src/app/models/login.model';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/service/user-store/user-store.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
  faCoffee = faCoffee;

  showLogin = true;
  showForgotPassword = false;
  showRegister = false;

  constructor(
    private dialogRef: MatDialogRef<SignInComponent>,
    public authService: AuthService,
    private router: Router,
    private userStore: UserStoreService,

  ) { }

  toggleForm(formType: string) {
    this.showLogin = formType === 'login';
    this.showForgotPassword = formType === 'forgotPassword';
    this.showRegister = formType === 'register';
  }

  async Login(userName: string, pass: string) {
    

    this.authService.login({ senha: pass, login:userName }).subscribe({
      next: (res) => {
        console.log(res);        
        this.router.navigate(['home']);
        
        this.authService.storeToken(res.accessToken!);
        this.authService.storeRefreshToken(res.refreshToken!);
        let decodedValue = this.authService.decodedToken();
        this.userStore.storeFullName(decodedValue.name);
        this.userStore.storeRole(decodedValue.role);
      }
    });  
  }

  async Register(userName: string, pass: string, email: string) {

    await this.authService.register({name: userName, password: pass, login:email });
     
  }

  ngOnInit() { }
}
