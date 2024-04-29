import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoEmEstoque } from 'src/app/products/models/produto-em-estoque.model';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class AvailableProductService {
  private availableProductsList$: BehaviorSubject<ProdutoEmEstoque[]>;
  public produtoUpdate: Subject<boolean>;

  baseUrl: String = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private _snack: MatSnackBar) {
    this.availableProductsList$ = new BehaviorSubject<ProdutoEmEstoque[]>([]);
    this.produtoUpdate = new Subject<boolean>();
  }

  loadAvailableProducts(initialDate: string | undefined, finalDate: string | undefined) {
    const url = `${this.baseUrl}/products/available-products?initialDate=${initialDate}&finalDate=${finalDate}`;
    this.http.get<ProdutoEmEstoque[]>(url).subscribe({
      next: (products) => {
        this.setAvailableProducts(products);
      },
      error: (err) => {
        this._snack.open(err.error.detail);
      }
    });
  }

  private setAvailableProducts(products: ProdutoEmEstoque[]) {
    this.availableProductsList$.next(products);
  }

  getAvailableProducts(): Observable<ProdutoEmEstoque[]> {
    return this.availableProductsList$.pipe(
      map(cart => cart)
    );
  }

  findProdutosDisponiveis(initialDate: String, finalDate: String): Observable<ProdutoEmEstoque[]> {
    const url = `${this.baseUrl}/products/available-products?initialDate=${initialDate}&finalDate=${finalDate}`;
    return this.http.get<ProdutoEmEstoque[]>(url);
  }
}
