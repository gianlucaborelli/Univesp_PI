import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from 'src/app/cart/service/cart.service';
import { SnackBarService } from 'src/app/components/snack-bar/service/snack-bar.service';
import { Address } from 'src/app/user/models/address.model';
import { UserService } from 'src/app/user/service/user.service';

@Component({
  selector: 'app-select-shipping-address',
  templateUrl: './select-shipping-address.component.html',
  styleUrl: './select-shipping-address.component.scss'
})
export class SelectShippingAddressComponent implements OnInit {
  @Input() userId: string | undefined ;
  
  displayedColumns: string[] = ["street", "number", "district", "city"];  
  dataSource: MatTableDataSource<Address> = new MatTableDataSource<Address>();

  constructor(
    private dialogRef: MatDialogRef<SelectShippingAddressComponent>,
    private _snack: SnackBarService,
    private userService: UserService,
    private cartService: CartService) {

    this.dialogRef.disableClose = true;
    this.dialogRef.updateSize("55%");
  }

  ngOnInit(): void {
    this.userService.getAllAddress(this.userId!).subscribe({
      next: (resposta) => {
        this.dataSource.data = resposta;                
      },
      error: (err) => {
        this._snack.open(err.error.detail);
      }
    });
  }

  selectedAddress(addressId: string) {
    this.cartService.setAddressToShipping(addressId);
    this.dialogRef.close();
  }
}
