import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Observable, delay, filter } from 'rxjs';
import { CartItem } from 'src/app/cart/model/cart-item.mode';
import { CartService } from 'src/app/cart/service/cart.service';
import { needConfirmation } from 'src/app/decorator/confirm-dialog.decorator';

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
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  cartItens$: Observable<CartItem[]> | undefined;
  cartCount$: Observable<number> | undefined;
  cartInitialDate$: Observable<Date | undefined> | undefined;
  cartFinalDate$: Observable<Date | undefined> | undefined;
  cartTotalPrice$: Observable<number | undefined> | undefined;

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 450px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private cartService: CartService, private observer: BreakpointObserver, private router: Router,) { }

  ngOnInit(): void {
    this.cartItens$ = this.cartService.getItems();
    this.cartCount$ = this.cartService.getCount();
    this.cartInitialDate$ = this.cartService.getInitialDate();
    this.cartFinalDate$ = this.cartService.getFinalDate();
    this.cartTotalPrice$ = this.cartService.getTotalPrice();
  };

  @needConfirmation({
    message: "Ao alterar a data do carrinho, os produtos inseridos serão automaticamente escluidos.",
    title: "Deseja Continuar?"
  })
  onDateRangeChange() {
    const startDate = this.range.get('start')?.value;
    const endDate = this.range.get('end')?.value;

    if (startDate && endDate) {
      this.cartService.setIntevalOfDate({ initialDate: startDate, finalDate: endDate })
    }
  };
}
