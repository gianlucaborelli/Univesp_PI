import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from 'src/app/components/snack-bar/service/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: String = environment.baseUrl;

  private currentProduct$: BehaviorSubject<Product>;

  constructor(    
    private http: HttpClient,
    private _snack: SnackBarService
  ) { 
    this.currentProduct$ = new BehaviorSubject<Product>({
      name: '',
      price: '',
      stock: '',
      description: ''
    });
  }

  loadCurrentProducts(id: string) {
    const url = `${this.baseUrl}/products/${id}`;
    this.http.get<Product>(url).subscribe({
      next: (products) => {
        this.setCurrentProduct(products);
      },
      error: (err) => {
        this._snack.open(err.error.detail);
      }
    });
  }

  private setCurrentProduct(product: Product) {
    this.currentProduct$.next(product);
  }

  getCurrentProduct(): Observable<Product> {
    return this.currentProduct$.pipe(
      map(product => product)
    );
  }

  findAll(): Observable<Product[]> {
    const url = `${this.baseUrl}/products`
    return this.http.get<Product[]>(url);
  }  

  findById(id: string): Observable<Product> {
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
}
