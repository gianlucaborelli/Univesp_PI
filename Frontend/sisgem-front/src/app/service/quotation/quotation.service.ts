import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { OrcamentoBase } from 'src/app/models/orcamento-base.model';
import { Orcamento } from 'src/app/models/orcamento.model';
import { ProdutoEmEstoque } from 'src/app/models/produto-em-estoque.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  public orcamentoUpdate: Subject<boolean>;
  
  constructor(private http: HttpClient, private _snack: MatSnackBar) { 
    this.orcamentoUpdate =new Subject<boolean>();
  }

  baseUrl: String = environment.baseUrl;

  findAll(): Observable<OrcamentoBase[]> {
    const url = `${this.baseUrl}/quotation`
    return this.http.get<OrcamentoBase[]>(url);
  }  

  findById(id: String): Observable<Orcamento> {
    const url = `${this.baseUrl}/quotation/${id}`
    return this.http.get<Orcamento>(url)
  }

  findProdutosEmEstoque(): Observable<ProdutoEmEstoque[]> {
    const url = `${this.baseUrl}/quotation`
    return this.http.get<ProdutoEmEstoque[]>(url);
  }

  create(body: Orcamento):Observable<Orcamento> {
    const url = `${this.baseUrl}/quotation`
    return this.http.post<Orcamento>(url,body);
  }

  update(body: Orcamento): Observable<Orcamento> {
    const url = `${this.baseUrl}/quotation`
    return this.http.put<Orcamento>(url, body)
  }

  delete(id: String): Observable<Orcamento> {
    const url = `${this.baseUrl}/quotation/${id}`
    return this.http.delete<Orcamento>(url)
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
