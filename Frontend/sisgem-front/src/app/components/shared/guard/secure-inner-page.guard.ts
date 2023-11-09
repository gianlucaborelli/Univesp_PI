import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';
import { SignInComponent } from '../../views/login/sign-in/sign-in.component';
import { MatDialog, MatDialogConfig, MatDialogModule  } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})

export class SecureInnerPageGuard implements CanActivate {

  constructor(private authService: AuthService, public router: Router, private dialog: MatDialog) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isLoggedIn !== true) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "25%";
      this.dialog.open(SignInComponent, dialogConfig);
    }

    return true;
  }
}