import { Injectable } from '@angular/core';
import { Produto } from '../../models/produtos.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) { }

  baseUrl: String = environment.baseUrl;

  findAll(): Observable<Produto[]> {
    const url = `${this.baseUrl}/produtos`
    return this.http.get<Produto[]>(url);
  }

  findById(id: Number): Observable<Produto> {
    const url = `${this.baseUrl}/produtos/${id}`
    return this.http.get<Produto>(url);
  }

  delete(id: String): Observable<Produto> {
    const url = `${this.baseUrl}/produtos/${id}`
    return this.http.delete<Produto>(url);
  }
}
