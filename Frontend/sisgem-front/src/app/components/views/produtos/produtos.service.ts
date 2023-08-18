import { Injectable } from '@angular/core';
import { Produto } from './produtos.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) { }

  baseUrl:String = 'http://localhost:8080'

  findAll():Observable<Produto[]>{
    const url = `${this.baseUrl}/produtos`
    return this.http.get<Produto[]>(url);
  }

  findById(id: Number ):Observable<Produto>{
    const url = `${this.baseUrl}/produtos/${id}`
    return this.http.get<Produto>(url);
  }
}
