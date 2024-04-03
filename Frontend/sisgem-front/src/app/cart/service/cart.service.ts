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

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart$: BehaviorSubject<Cart>;  

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient,
    private snackBar: SnackBarService,
    private userStore: UserStoreService) {
    this.cart$ = new BehaviorSubject<Cart>({
      userId: '',
      cartItens: []
    });
    this.loadUserCart();    
  }

  loadUserCart() {
    const url = `${this.baseUrl}/users/${this.userStore.getId()}/cart`;
    this.http.get<Cart>(url).subscribe({
      next: (shoppingCart) => {
        this.setShoppingCart(shoppingCart);        
      },
      error: (error) => {
        console.error('Shopping cart data could not be loaded.');
      }
    });
  }

  private setShoppingCart(cart: Cart) {
    this.cart$.next(cart);
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
}
