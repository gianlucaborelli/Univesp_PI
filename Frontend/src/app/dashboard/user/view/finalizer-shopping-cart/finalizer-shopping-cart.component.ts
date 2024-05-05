import { Component, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable,  distinctUntilChanged, map, switchMap, take } from 'rxjs';
import { CartItem } from 'src/app/cart/model/cart-item.mode';
import { Cart } from 'src/app/cart/model/cart.model';
import { CartService } from 'src/app/cart/service/cart.service';
import { SelectShippingAddressComponent } from '../../component/select-shipping-address/select-shipping-address.component';

@Component({
  selector: 'app-finalizer-shopping-cart',
  templateUrl: './finalizer-shopping-cart.component.html',
  styleUrl: './finalizer-shopping-cart.component.scss',
  providers:    [    
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }, 
  ],
})
export class FinalizerShoppingCartComponent {
  displayedColumns: string[] = ["name", "unitPrice", "units", "totalPrice", "actions"];  
  dataSource: MatTableDataSource<CartItem> = new MatTableDataSource<CartItem>();
  isAddressPresent: boolean = true;
  cart$: Observable<Cart> | undefined;

  constructor(
    private service: CartService,
    private dialog: MatDialog
  ){
    this.cart$ = this.service.getCart();

    this.cart$.pipe(
      map(cart => cart.shippingAddress), 
      map(address => !!address),
      distinctUntilChanged() 
    ).subscribe(hasAddress => {
      this.isAddressPresent = hasAddress;
    });

    this.cart$.subscribe(cart => {
      if (cart) {
        this.dataSource.data = cart.cartItens;
      }
    });
  }

  deleteItem(id: string){
    this.service.deleteItemFromCart(id);
  }

  addAddressOnCart(){
    this.cart$!.pipe(
      take(1),
      switchMap(cart => {
        const dialogConfig = new MatDialogConfig();
        const dialogRef = this.dialog.open(SelectShippingAddressComponent, dialogConfig);
        dialogRef.componentInstance.userId = cart.userId;        
        return dialogRef.afterClosed();
      })
    ).subscribe(result => {
      if (result) {
        this.service.loadUserCart();
      }
    });
  }

  finalizerCart(){
    this.service.finalizarCart();
  }
}
