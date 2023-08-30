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

  create(body: Endereco): Observable<Endereco> {
    const url = `${this.baseUrl}/enderecos`;
    return this.http.post<Endereco>(url, body);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
