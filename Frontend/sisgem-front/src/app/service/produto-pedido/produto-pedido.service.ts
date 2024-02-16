import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AddProdutoPedido } from 'src/app/models/add-produto-pedido.model';
import { ProdutoExiste } from 'src/app/models/produto-existe.model';
import { ProdutoPedido } from 'src/app/models/produto-pedido.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoPedidoService {
  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  baseUrl: String = environment.baseUrl;

  getAllByOrcamentoId(orcamentoId: String): Observable<ProdutoPedido[]> {
    const url = `${this.baseUrl}/produtoPedido/orcamento=${orcamentoId}`    
    return this.http.get<ProdutoPedido[]>(url);
  }

  produtoExiste(orcamentoId: String, produtoId:String): Observable<ProdutoExiste> {
    const url = `${this.baseUrl}/produtoPedido/produtoPedidoJaExiste?orcamentoId=${orcamentoId}&produtoId=${produtoId}`    
    return this.http.get<ProdutoExiste>(url);
  }

  addProduto(body: AddProdutoPedido): Observable<ProdutoPedido> {
    const url = `${this.baseUrl}/produtoPedido`;
    console.log('Body', body);
    return this.http.post<ProdutoPedido>(url, body);
  }

  updateProduto(body: ProdutoExiste): Observable<ProdutoPedido> {
    const url = `${this.baseUrl}/produtoPedido`
    return this.http.put<ProdutoPedido>(url, body);
  }  

  deleteProduto(id: String): Observable<ProdutoPedido> {
    const url = `${this.baseUrl}/produtoPedido/${id}`
    return this.http.delete<ProdutoPedido>(url);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
