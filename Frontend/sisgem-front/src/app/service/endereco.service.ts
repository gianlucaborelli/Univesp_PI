import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Endereco } from '../models/endereco.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  baseUrl: String = environment.baseUrl;

  findById(id: String): Observable<Endereco> {
    const url = `${this.baseUrl}/enderecos/${id}`
    return this.http.get<Endereco>(url);
  }

  create(body: Endereco): Observable<Endereco> {
    const url = `${this.baseUrl}/enderecos`;
    return this.http.post<Endereco>(url, body);
  }

  delete(id: String): Observable<Endereco> {
    const url = `${this.baseUrl}/enderecos/${id}`
    return this.http.delete<Endereco>(url);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
