import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  baseUrl: String = environment.baseUrl;

  private currentUser$: BehaviorSubject<User>;

  public enderecoAdd: Subject<boolean>;
  public clienteUpdate: Subject<boolean>;

  constructor(
    private http: HttpClient,
    private _snack: MatSnackBar) {
    this.enderecoAdd = new Subject<boolean>();
    this.clienteUpdate = new Subject<boolean>();

    this.currentUser$ = new BehaviorSubject<User>({
      name: '',
      obs: '',
      role: '',
      addresses: []
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
      error: (error) => {
        console.error('User data could not be loaded.');
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

  update(body: User): Observable<User> {
    const url = `${this.baseUrl}/users`
    return this.http.put<User>(url, body)
  }

  delete(id: String): Observable<User> {
    const url = `${this.baseUrl}/users/${id}`
    return this.http.delete<User>(url);
  }  
}
