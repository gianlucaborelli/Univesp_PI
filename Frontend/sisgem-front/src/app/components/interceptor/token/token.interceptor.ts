import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../../authentication/service/auth.service';
import { Router } from '@angular/router';
import { TokenApiModel } from '../../../authentication/models/token-api.model';
import { SnackBarService } from '../../snack-bar/service/snack-bar.service';
import { RefreshTokenModel } from '../../../authentication/models/refresh-token.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private refreshingToken = false;

  constructor(private auth: AuthService, private router: Router, private snackbarService: SnackBarService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              return this.handleUnAuthorizedError(request, next);
            default:
              return throwError(() => err);
          }
        } else {
          return throwError(() => err);
        }
      })
    );
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.refreshingToken) {
      this.refreshingToken = true;

      let tokeApiModel = new RefreshTokenModel();
      tokeApiModel.refreshToken = this.auth.getRefreshToken()!;

      return this.auth.renewToken(tokeApiModel).pipe(
        switchMap((data: TokenApiModel) => {
          console.log(data);
          this.auth.storeRefreshToken(data.refreshToken);
          this.auth.storeToken(data.accessToken);

          this.refreshingToken = false;
          return next.handle(req); 
        }),
        catchError((err) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.snackbarService.open("Token Expirado");
            this.auth.logout();
          } else {
            console.log(err);
            this.snackbarService.open(err);
            this.auth.logout();
          }
          this.refreshingToken = false;
          return throwError(() => err);
        })
      );
    } else {
      return throwError(() => new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' }));
    }
  }
}