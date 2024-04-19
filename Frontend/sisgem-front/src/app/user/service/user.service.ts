import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { SetUserRuleDto } from '../models/dto/set-user-rule.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: String = environment.baseUrl;

  private currentUser$: BehaviorSubject<User>;

  constructor(
    private http: HttpClient,
    private _snack: MatSnackBar) {

    this.currentUser$ = new BehaviorSubject<User>({
      name: '',
      obs: '',
      role: '',
      addresses: []
    });
  }

  private setCurrentUser(user: User) {
    this.currentUser$.next(user);
  }

  loadCurrentUser(id: string) {
    const url = `${this.baseUrl}/users/${id}`;
    this.http.get<User>(url).subscribe({
      next: (shoppingCart) => {
        this.setCurrentUser(shoppingCart);               
      },
      error: (err) => {
        this._snack.open(err.error.detail)
      }
    });
  } 

  getCurrentUser(): Observable<User> {
    return this.currentUser$.pipe(
      map(user => user)
    );
  }

  findAll(): Observable<User[]> {
    const url = `${this.baseUrl}/users/`
    return this.http.get<User[]>(url);
  }

  findById(id: String): Observable<User> {
    const url = `${this.baseUrl}/users/${id}`
    return this.http.get<User>(url);
  }

  create(body: User): Observable<User> {
    const url = `${this.baseUrl}/users`;
    return this.http.post<User>(url, body);
  }

  setRule(userId: string, rule: SetUserRuleDto): Observable<User> {
    const url = `${this.baseUrl}/users/${userId}/set-rule`
    return this.http.put<User>(url, rule);
  }

  update(body: User): Observable<User> {
    const url = `${this.baseUrl}/users`
    return this.http.put<User>(url, body)
  }

  delete(id: String): Observable<User> {
    const url = `${this.baseUrl}/users/${id}`
    return this.http.delete<User>(url);
  }  
}
