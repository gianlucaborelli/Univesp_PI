import { registerLocaleData } from '@angular/common';
import { Component, DEFAULT_CURRENCY_CODE, Input, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import ptBr from '@angular/common/locales/pt';
import { CartService } from 'src/app/cart/service/cart.service';
import { ProdutoEmEstoque } from 'src/app/products/models/produto-em-estoque.model';

registerLocaleData(ptBr);

@Component({
  selector: 'app-shopping-item-card',
  templateUrl: './shopping-item-card.component.html',
  styleUrl: './shopping-item-card.component.scss',
  providers:    [    
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }, 
  ],
})
export class ShoppingItemCardComponent implements OnInit {
  @Input({ required: true })
  product!: ProdutoEmEstoque;
  counter = new FormControl();

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const itemList = this.cartService.getItems();

    itemList.subscribe((list) =>{
      const specificItem = list.find(item => item.product.id === this.product.id);
    if (specificItem) {
      this.counter.setValue(specificItem.amount);
    } else {
      this.counter.setValue(0);
    }
    });       
  }

  addItem() {
    const currentValue = this.counter.value;
    if (currentValue < this.product.stock) {      
      this.cartService.addItem({ productId: this.product.id, amount: currentValue + 1 });
    }
  }

  removeItem() {
    const currentValue = this.counter.value;
    if (currentValue > 0) {
      this.cartService.addItem({ productId: this.product.id, amount: currentValue - 1 });
    }
  }
}
