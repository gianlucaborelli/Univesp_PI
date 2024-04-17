import { Component } from '@angular/core';
import { AuthService } from 'src/app/authentication/service/auth.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/authentication/service/user-store.service';
import { SnackBarService } from 'src/app/components/snack-bar/service/snack-bar.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
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
    (await this.authService.login({ password: pass, email: userName })).subscribe({
      next: () => {
        console.log(this.userStore.getRole())
        var role = this.userStore.getRole();
        console.log(this.userStore.getRole())
        if(role == '[ROLE_USER]'){
          this.router.navigate(['home']);
        }else{
          this.router.navigate(['admin']);
        }        
      },
      error: (err) => {
        console.error(err);        
        this.snackbarService.open(err.error.detail);
      }
    });  
  }

  async Register(userName: string, pass: string, email: string) {
    this.authService.register({name: userName, password: pass, email:email }).subscribe({
      next: (res) => {
        console.log(res);        
        this.snackbarService.open("Registro criado com sucesso. Faça seu Login.");
        this.toggleForm('login');       
      },
      error: (err) => {
        console.error(err);        
        this.snackbarService.open(err.error.detail);
      }
    });
  }

  NotImplemented(){
    this.snackbarService.open("Não implementado.");
  }
}
