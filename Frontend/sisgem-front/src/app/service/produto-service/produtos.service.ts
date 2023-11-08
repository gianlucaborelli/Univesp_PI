import { Injectable } from '@angular/core';
import { Produto } from '../../models/produtos.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoEmEstoque } from 'src/app/models/produto-em-estoque.model';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  public produtoUpdate: Subject<boolean>;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { this.produtoUpdate =new Subject<boolean>();}

  baseUrl: String = environment.baseUrl;

  findAll(): Observable<Produto[]> {
    const url = `${this.baseUrl}/produtos`
    return this.http.get<Produto[]>(url);
  }  

  findProdutosDisponiveis(dataInicio: String, dataFinal: String): Observable<ProdutoEmEstoque[]> {
    const url = `${this.baseUrl}/produtos/produtosDisponiveis?dataInicio=${dataInicio}&dataFinal=${dataFinal}`;
    return this.http.get<ProdutoEmEstoque[]>(url);
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
