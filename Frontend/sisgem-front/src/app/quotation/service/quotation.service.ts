import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { QuotationBase } from 'src/app/quotation/models/quotation-base.model';
import { Quotation } from 'src/app/quotation/models/quotation.model';
import { ProdutoEmEstoque } from 'src/app/products/models/produto-em-estoque.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  baseUrl: String = environment.baseUrl;  
  
  constructor(
    private http: HttpClient, 
    private _snack: MatSnackBar) { 
  }  

  findAll(): Observable<Quotation[]> {
    const url = `${this.baseUrl}/quotation`
    return this.http.get<Quotation[]>(url);
  }  

  findById(id: String): Observable<Quotation> {
    const url = `${this.baseUrl}/quotation/${id}`
    return this.http.get<Quotation>(url)
  }

  findProdutosEmEstoque(): Observable<ProdutoEmEstoque[]> {
    const url = `${this.baseUrl}/quotation`
    return this.http.get<ProdutoEmEstoque[]>(url);
  }

  create(body: Quotation):Observable<Quotation> {
    const url = `${this.baseUrl}/quotation`
    return this.http.post<Quotation>(url,body);
  }

  update(body: Quotation): Observable<Quotation> {
    const url = `${this.baseUrl}/quotation`
    return this.http.put<Quotation>(url, body)
  }

  delete(id: String): Observable<Quotation> {
    const url = `${this.baseUrl}/quotation/${id}`
    return this.http.delete<Quotation>(url)
  }
}
