import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public enderecoAdd: Subject<boolean>;
  public clienteUpdate: Subject<boolean>;

  constructor(private http: HttpClient, 
              private _snack: MatSnackBar) 
              {this.enderecoAdd = new Subject<boolean>();
               this.clienteUpdate =new Subject<boolean>();}

  baseUrl: String = environment.baseUrl;

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

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
