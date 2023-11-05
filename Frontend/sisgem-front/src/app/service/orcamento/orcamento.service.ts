import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { Orcamento } from 'src/app/models/orcamento.model';
import { ProdutoEmEstoque } from 'src/app/models/produto-em-estoque.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  baseUrl: String = environment.baseUrl;

  findAll(): Observable<Orcamento[]> {
    const url = `${this.baseUrl}/orcamentos`
    return this.http.get<Orcamento[]>(url);
  }  

  findProdutosEmEstoque(): Observable<ProdutoEmEstoque[]> {
    const url = `${this.baseUrl}/orcamentos`
    return this.http.get<ProdutoEmEstoque[]>(url);
  }

  create(body: Orcamento):Observable<Orcamento> {
    const url = `${this.baseUrl}/orcamentos`
    return this.http.post<Orcamento>(url,body);
  }

  update(body: Orcamento): Observable<Orcamento> {
    const url = `${this.baseUrl}/orcamentos`
    return this.http.put<Orcamento>(url, body)
  }

  delete(id: String): Observable<Orcamento> {
    const url = `${this.baseUrl}/orcamentos/${id}`
    return this.http.delete<Orcamento>(url)
  }
}
