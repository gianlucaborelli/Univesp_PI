import { Injectable, NgModule, NgZone } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  User
} from '@angular/fire/auth';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignInComponent } from 'src/app/components/views/login/sign-in/sign-in.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  UserData: any;
  constructor(private auth: Auth, private router: Router, public ngZone: NgZone, private dialog: MatDialog) {
    onAuthStateChanged(this.auth, (user: any) => {
      if (user) {
        this.UserData = user;
        localStorage.setItem('user', JSON.stringify(this.UserData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }

  getAuthFire() {
    return this.auth.currentUser;
  }
  
  getAuthLocal() {
    const token = localStorage.getItem('user')
    const user = JSON.parse(token as string);
    return user;
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('user')
    const user = JSON.parse(token as string);
    return user !== null ? true : false;
  }

  Register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.UserData = result.user;
        this.ngZone.run(() => {        
          this.sendEmailVerification()
          this.router.navigate(['/home']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  async Login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        this.UserData = result.user;
        this.ngZone.run(() => {
          this.router.navigate(['/home']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  Logout() {
    signOut(this.auth).then(() => {
      {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "25%";
        this.dialog.open(SignInComponent, dialogConfig);
      }
    })
  }
  
  GoogleAuth() {
    return this.loginWithPopup(new GoogleAuthProvider());
  }
  
  loginWithPopup(provider: any) {
    return signInWithPopup(this.auth, provider).then(() => {
      this.router.navigate(['home']);
    });
  }

  async sendPasswordResetEmails(email: string) {
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  sendEmailVerification() {
    return sendEmailVerification(this.auth.currentUser as User);
  }
}
