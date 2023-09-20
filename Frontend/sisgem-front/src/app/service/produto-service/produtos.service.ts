import { Injectable } from '@angular/core';
import { Produto } from '../../models/produtos.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  baseUrl: String = environment.baseUrl;

  findAll(): Observable<Produto[]> {
    const url = `${this.baseUrl}/produtos`
    return this.http.get<Produto[]>(url);
  }

  findById(id: Number): Observable<Produto> {
    const url = `${this.baseUrl}/produtos/${id}`
    return this.http.get<Produto>(url);
  }

  create(body: Produto): Observable<Produto> {
    const url = `${this.baseUrl}/produtos`;
    return this.http.post<Produto>(url, body);
  }

  update(body: Produto): Observable<Produto> {
    const url = `${this.baseUrl}/produtos`
    return this.http.put<Produto>(url, body)
  }

  delete(id: String): Observable<Produto> {
    const url = `${this.baseUrl}/produtos/${id}`
    return this.http.delete<Produto>(url);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
