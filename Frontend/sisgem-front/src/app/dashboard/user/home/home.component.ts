import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/cart/model/cart-item.mode';
import { CartService } from 'src/app/cart/service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
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

  cartItens$: Observable<CartItem[]> | undefined;
  cartCount$: Observable<number> | undefined;
  cartInitialDate$: Observable<Date | undefined> | undefined;
  cartFinalDate$: Observable<Date | undefined> | undefined;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private cartService: CartService) {  }

  ngOnInit(): void {
    this.cartItens$ = this.cartService.getItems();
    this.cartCount$ = this.cartService.getCount();
    this.cartInitialDate$ = this.cartService.getInitialDate();
    this.cartFinalDate$ = this.cartService.getFinalDate();
  }

  addItem() {
    this.cartService.addItem({ productId: "41f8dc4b-89f2-4a13-a8bd-c1d797d3da3e", amount: 5 });
  }

  onDateRangeChange() {
    const startDate = this.range.get('start')?.value;
    const endDate = this.range.get('end')?.value;

    if (startDate && endDate) {
      this.cartService.setIntevalOfDate({ initialDate: startDate, finalDate: endDate })
    }
  }
}
