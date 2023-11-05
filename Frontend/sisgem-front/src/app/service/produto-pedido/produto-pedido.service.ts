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

  addProduto(body: AddProdutoPedido): Observable<ProdutoPedido> {
    const url = `${this.baseUrl}/produtoPedido`
    return this.http.post<ProdutoPedido>(url, body);
  }
}
