import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AddItemToQuotation } from 'src/app/quotation/models/add-item-to-quotation.model';
import { ProdutoExiste } from 'src/app/products/models/produto-existe.model';
import { QuotedProduct } from 'src/app/products/models/quoted-product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoPedidoService {
  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  baseUrl: String = environment.baseUrl;

  getAllByOrcamentoId(orcamentoId: String): Observable<QuotedProduct[]> {
    const url = `${this.baseUrl}/produtoPedido/orcamento=${orcamentoId}`    
    return this.http.get<QuotedProduct[]>(url);
  }

  produtoExiste(orcamentoId: String, produtoId:String): Observable<ProdutoExiste> {
    const url = `${this.baseUrl}/produtoPedido/produtoPedidoJaExiste?orcamentoId=${orcamentoId}&produtoId=${produtoId}`    
    return this.http.get<ProdutoExiste>(url);
  }

  addProduto(body: AddItemToQuotation): Observable<QuotedProduct> {
    const url = `${this.baseUrl}/produtoPedido`;
    console.log('Body', body);
    return this.http.post<QuotedProduct>(url, body);
  }

  updateProduto(body: ProdutoExiste): Observable<QuotedProduct> {
    const url = `${this.baseUrl}/produtoPedido`
    return this.http.put<QuotedProduct>(url, body);
  }  

  deleteProduto(id: String): Observable<QuotedProduct> {
    const url = `${this.baseUrl}/produtoPedido/${id}`
    return this.http.delete<QuotedProduct>(url);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
