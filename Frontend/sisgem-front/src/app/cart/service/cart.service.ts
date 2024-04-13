import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { SnackBarService } from 'src/app/components/shared/snack-bar/service/snack-bar.service';
import { Cart } from '../model/cart.model';
import { environment } from 'src/environments/environment';
import { UserStoreService } from 'src/app/authentication/service/user-store.service';
import { AddItemDto } from '../model/dto/add-item-dto.model';
import { CartItem } from '../model/cart-item.mode';
import { IntervalOfDate } from '../model/dto/interval-of-date.model';
import * as moment from 'moment';
import { ProductService } from 'src/app/products/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart$: BehaviorSubject<Cart>;  

  baseUrl: String = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: SnackBarService,
    private userStore: UserStoreService,
    private productService: ProductService) {
    this.cart$ = new BehaviorSubject<Cart>({
      userId: '',
      cartItens: []
    });
    this.loadUserCart();    
  }

  loadUserCart()  {
    const url = `${this.baseUrl}/users/${this.userStore.getId()}/cart`;
    this.http.get<Cart>(url).subscribe({
      next: (shoppingCart) => {
        this.setShoppingCart(shoppingCart);       
        this.onCartChange(); 
      },
      error: (error) => {
        console.error('Shopping cart data could not be loaded.');
      }
    });
  }  

  private setShoppingCart(cart: Cart) {
    this.cart$.next(cart);
  }

  private onCartChange(): void{
    if(this.cart$.value.initialDate || this.cart$.value.finalDate )
    {
      this.productService.loadAvailableProducts(this.cart$.value.initialDate, this.cart$.value.finalDate);
      this.router.navigate(['/home/shopping'], { relativeTo: this.activatedRoute.parent })
      .then(nav => {
        console.log(nav);
      }, err => {
        console.log(err)
      });
    }
  }  

  getItems(): Observable<CartItem[]> {
    return this.cart$.pipe(
      map(cart => cart.cartItens)
    );
  }

  getInitialDate(): Observable<Date | undefined> {
    return this.cart$.pipe(
      map(s => {
        if (s && s.initialDate) {
          // Convertendo a string para o tipo Date
          return moment(s.initialDate, 'DD/MM/YYYY').toDate();
        } else {
          return undefined;
        }
      })
    );
  }

  getFinalDate(): Observable<Date | undefined> {
    return this.cart$.pipe(
      map(s => {
        if (s && s.finalDate) {
          return moment(s.finalDate, 'DD/MM/YYYY').toDate();
        } else {
          return undefined;
        }
      })
    );
  }

  getTotalPrice(): Observable<number | undefined> {
    return this.cart$.pipe(
      map(cart => cart.totalPrice)
    );
  }

  getCount(): Observable<number> {
    return this.cart$.pipe(
      map((cart) => {
        const count = cart.cartItens
          .map((item) => item.amount)
          .reduce((p, c) => p + c, 0);        
        return count;
      })
    );
  }

  addItem(itemToAdd: AddItemDto) {    
    const url = `${this.baseUrl}/users/${this.userStore.getId()}/cart/${this.cart$.value.id}`;
    this.http.put<Cart>(url, itemToAdd).subscribe({
      next: (resposta) => {
        this.setShoppingCart(resposta);
        console.log(resposta);
        this.loadUserCart();
      },
      error: () => {
        console.error('Shopping cart data could not be loaded.');
      }
    });
  }

  setIntevalOfDate(intervalOfDate: IntervalOfDate) {  
    const url = `${this.baseUrl}/users/${this.userStore.getId()}/cart/${this.cart$.value.id}/set-dates`;
    this.http.put<Cart>(url, intervalOfDate).subscribe({
      next: (resposta) => {
        this.setShoppingCart(resposta);
        this.loadUserCart();
      },
      error: () => {
        console.error('Shopping cart data could not be loaded.');
      }
    });
  }

  deleteItemFromCart(itemId: string) {  
    const url = `${this.baseUrl}/users/${this.userStore.getId()}/cart/${this.cart$.value.id}/item/${itemId}`;
    this.http.delete<Cart>(url).subscribe({
      next: (resposta) => {
        this.setShoppingCart(resposta);
        this.loadUserCart();
      },
      error: () => {
        console.error('Shopping cart data could not be loaded.');
      }
    });
  }
}
