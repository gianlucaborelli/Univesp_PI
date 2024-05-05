import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { SnackBarService } from 'src/app/components/snack-bar/service/snack-bar.service';
import { Cart } from '../model/cart.model';
import { environment } from 'src/environments/environment';
import { UserStoreService } from 'src/app/authentication/service/user-store.service';
import { AddItemToCartDto } from '../model/dto/add-item-to-cart-dto.model';
import { CartItem } from '../model/cart-item.mode';
import { IntervalOfDate } from '../model/dto/interval-of-date.model';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailableProductService } from 'src/app/products/service/available-product.service';

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
    private productService: AvailableProductService) {
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
        this.onCartChange();
      },
      error: (error) => {
        this.snackBar.open(error.err.detail);
      }
    });
  }

  private setShoppingCart(cart: Cart) {
    this.cart$.next(cart);
  }

  private onCartChange(): void {
    if (this.cart$.value.initialDate || this.cart$.value.finalDate) {
      this.productService.loadAvailableProducts(this.cart$.value.initialDate, this.cart$.value.finalDate);
    }
  }

  getCart(): Observable<Cart> {
    return this.cart$.pipe(
      map(cart => cart)
    );
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

  addItem(itemToAdd: AddItemToCartDto) {
    const url = `${this.baseUrl}/users/${this.userStore.getId()}/cart/${this.cart$.value.id}`;
    this.http.put<Cart>(url, itemToAdd).subscribe({
      next: (resposta) => {
        this.setShoppingCart(resposta);
        console.log(resposta);
        this.loadUserCart();
      },
      error: (error) => {
        this.snackBar.open(error.err.detail);
      }
    });
  }

  setIntevalOfDate(intervalOfDate: IntervalOfDate) {
    const url = `${this.baseUrl}/users/${this.userStore.getId()}/cart/${this.cart$.value.id}/set-dates`;
    this.http.put<Cart>(url, intervalOfDate).subscribe({
      next: (resposta) => {
        this.setShoppingCart(resposta);
        this.loadUserCart();
        this.router.navigate(['/home/shopping'], { relativeTo: this.activatedRoute.parent })
          .then(nav => {
            console.log(nav);
          }, err => {
            console.log(err)
          });
      },
      error: (error) => {
        this.snackBar.open(error.err.detail);
      }
    });
  }

  finalizarCart() {
    const url = `${this.baseUrl}/users/${this.userStore.getId()}/cart/${this.cart$.value.id}/finalizer`;
    this.http.put<boolean>(url, {}).subscribe({
      next: (resposta) => {
        if(resposta){
          this.loadUserCart();
          this.router.navigate(['/home/history']);
        }        
      },
      error: (error) => {
        this.snackBar.open(error.err.detail);
      }
    });
  }

  setAddressToShipping(addressId: string) {
    const url = `${this.baseUrl}/users/${this.userStore.getId()}/cart/${this.cart$.value.id}/address/${addressId}`;
    this.http.put<Cart>(url, {}).subscribe({
      next: (resposta) => {
        this.setShoppingCart(resposta);
        this.loadUserCart();
      },
      error: (error) => {
        this.snackBar.open(error.err.detail);
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
      error: (error) => {
        this.snackBar.open(error.err.detail);
      }
    });
  }
}
