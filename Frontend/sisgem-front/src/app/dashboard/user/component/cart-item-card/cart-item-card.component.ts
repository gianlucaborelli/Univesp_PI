import { registerLocaleData } from '@angular/common';
import { Component, DEFAULT_CURRENCY_CODE, Input, LOCALE_ID } from '@angular/core';
import { CartItem } from 'src/app/cart/model/cart-item.mode';
import ptBr from '@angular/common/locales/pt';
import { needConfirmation } from 'src/app/decorator/confirm-dialog.decorator';
import { CartService } from 'src/app/cart/service/cart.service';



registerLocaleData(ptBr);

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.scss'],
  providers:    [    
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }, 
  ],
})
export class CartItemCardComponent {

  @Input({ required: true })
  cartitem!: CartItem;

  constructor(private service: CartService) {
  }

  @needConfirmation({title: "Confirmar a Exclusão",message: "Deseja realmente remover o item do carrinho?"})
  deleteItemToCart(){
    this.service.deleteItemFromCart(this.cartitem.id!);
  }
}
