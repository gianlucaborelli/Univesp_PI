import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './clientes.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  baseUrl: String = 'http://localhost:8080'

  findAll(): Observable<Cliente[]> {
    const url = `${this.baseUrl}/clientes`
    return this.http.get<Cliente[]>(url);
  }

  findById(id: String): Observable<Cliente> {
    const url = `${this.baseUrl}/clientes/${id}`
    return this.http.get<Cliente>(url);
  }

  create(body: Cliente): Observable<Cliente> {
    const url = `${this.baseUrl}/clientes`;
    return this.http.post<Cliente>(url, body);
  }

  delete(id: String): Observable<Cliente> {
    const url = `${this.baseUrl}/clientes/${id}`
    return this.http.delete<Cliente>(url);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
