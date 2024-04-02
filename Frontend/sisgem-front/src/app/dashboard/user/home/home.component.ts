import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Cart } from 'src/app/cart/model/cart.model';
import { CartService } from 'src/app/cart/service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class HomeComponent implements OnInit { 
  
  cart!: Cart;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor (private cartService: CartService) {}  

  ngOnInit(): void {    
    this.cartService.loadUserCart();
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  getCartItemCount(): number {
    if (!this.cart) return 0;
    return this.cart.cartItens.length;
  }

  addItem(){
    this.cartService.addItem({productId: "41f8dc4b-89f2-4a13-a8bd-c1d797d3da3e" , amount: 0});    
  }
}
