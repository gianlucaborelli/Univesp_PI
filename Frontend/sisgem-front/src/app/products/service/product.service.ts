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
export class ProductService {
  private availableProductsList$: BehaviorSubject<ProdutoEmEstoque[]>;
  public produtoUpdate: Subject<boolean>;

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private _snack: MatSnackBar) {
    this.availableProductsList$ = new BehaviorSubject<ProdutoEmEstoque[]>([]);
    this.produtoUpdate = new Subject<boolean>();
  }

  loadAvailableProducts(initialDate: string | undefined, finalDate: string | undefined) {
    const url = `${this.baseUrl}/products/available-products?initialDate=${initialDate}&finalDate=${finalDate}`;
    this.http.get<ProdutoEmEstoque[]>(url).subscribe({
      next: (products) => {
        this.setAvailableProducts(products);
      },
      error: (error) => {
        console.error('Shopping cart data could not be loaded.');
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

  findAll(): Observable<Product[]> {
    const url = `${this.baseUrl}/products`
    return this.http.get<Product[]>(url);
  }

  findProdutosDisponiveis(initialDate: String, finalDate: String): Observable<ProdutoEmEstoque[]> {
    const url = `${this.baseUrl}/products/available-products?initialDate=${initialDate}&finalDate=${finalDate}`;
    return this.http.get<ProdutoEmEstoque[]>(url);
  }

  findById(id: Number): Observable<Product> {
    const url = `${this.baseUrl}/products/${id}`
    return this.http.get<Product>(url);
  }

  create(body: Product): Observable<Product> {
    const url = `${this.baseUrl}/products`;
    return this.http.post<Product>(url, body);
  }

  update(body: Product): Observable<Product> {
    const url = `${this.baseUrl}/products`
    return this.http.put<Product>(url, body)
  }

  delete(id: String): Observable<Product> {
    const url = `${this.baseUrl}/products/${id}`
    return this.http.delete<Product>(url);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
