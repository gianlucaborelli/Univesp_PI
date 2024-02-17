import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/service/user-store/user-store.service';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent {
  faCoffee = faCoffee;

  showLogin = true;
  showForgotPassword = false;
  showRegister = false;

  constructor(    
    public authService: AuthService,
    private router: Router,
    private userStore: UserStoreService,
    private snackbarService: SnackBarService,
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
      },
      error: (err) => {
        console.error(err);        
        this.snackbarService.open("Erro durante o login. Verifique suas credenciais.");
      }
    });  
  }

  async Register(userName: string, pass: string, email: string) {
    this.authService.register({name: userName, password: pass, login:email }).subscribe({
      next: (res) => {
        console.log(res);        
        this.toggleForm('login');       
      },
      error: (err) => {
        console.error(err);        
        this.snackbarService.open("Erro durante o registro. Verifique suas credenciais.");
      }
    });
  }

  NotImplemented(){
    this.snackbarService.open("Não implementado.");
  }
}
