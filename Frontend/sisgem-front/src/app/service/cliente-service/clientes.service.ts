import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cliente } from '../../models/clientes.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  public enderecoAdd: Subject<boolean>;
  constructor(private http: HttpClient, private _snack: MatSnackBar) {this.enderecoAdd = new Subject<boolean>(); }

  baseUrl: String = environment.baseUrl;

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

  update(body: Cliente): Observable<Cliente> {
    const url = `${this.baseUrl}/clientes`
    return this.http.put<Cliente>(url, body)
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
