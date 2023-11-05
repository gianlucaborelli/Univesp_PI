import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AddProdutoPedido, ProdutoPedido } from 'src/app/models/produto-pedido.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProdutoPedidoService {
  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  baseUrl: String = environment.baseUrl;

  async addProduto(body: AddProdutoPedido): Promise<Observable<ProdutoPedido>> {
    const url = `${this.baseUrl}/produtoPedido`;
    return this.http.post<ProdutoPedido>(url, body);
  }

  updateProduto(body: ProdutoPedido): Observable<ProdutoPedido> {
    const url = `${this.baseUrl}/produtoPedido`
    return this.http.put<ProdutoPedido>(url, body);
  }

  deleteProduto(id: String): Observable<ProdutoPedido> {
    const url = `${this.baseUrl}/produtoPedido/${id}`
    return this.http.delete<ProdutoPedido>(url);
  }

}
