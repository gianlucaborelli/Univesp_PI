import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AvailableProduct } from '../models/available-product.model';

@Injectable({
  providedIn: 'root'
})
export class AvailableProductService {
  private availableProductsList$: BehaviorSubject<AvailableProduct[]>;
  public produtoUpdate: Subject<boolean>;

  baseUrl: String = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private _snack: MatSnackBar) {
    this.availableProductsList$ = new BehaviorSubject<AvailableProduct[]>([]);
    this.produtoUpdate = new Subject<boolean>();
  }

  loadAvailableProducts(initialDate: string | undefined, finalDate: string | undefined) {
    const url = `${this.baseUrl}/products/available-products?initialDate=${initialDate}&finalDate=${finalDate}`;
    this.http.get<AvailableProduct[]>(url).subscribe({
      next: (products) => {
        this.setAvailableProducts(products);
      },
      error: (err) => {
        this._snack.open(err.error.detail);
      }
    });
  }

  private setAvailableProducts(products: AvailableProduct[]) {
    this.availableProductsList$.next(products);
  }

  getAvailableProducts(): Observable<AvailableProduct[]> {
    return this.availableProductsList$.pipe(
      map(products => products)
    );
  }
}
