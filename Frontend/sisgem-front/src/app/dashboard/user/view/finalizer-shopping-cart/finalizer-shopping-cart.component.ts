import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/cart/model/cart.model';
import { CartService } from 'src/app/cart/service/cart.service';

@Component({
  selector: 'app-finalizer-shopping-cart',
  templateUrl: './finalizer-shopping-cart.component.html',
  styleUrl: './finalizer-shopping-cart.component.scss'
})
export class FinalizerShoppingCartComponent {
  cart$: Observable<Cart> | undefined;

  constructor(
    private service: CartService
  ){
    this.cart$ = this.service.getCart();
  }

}
