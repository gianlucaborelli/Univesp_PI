import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { needConfirmation } from 'src/app/components/decorator/confirm-dialog.decorator';
import { Address } from 'src/app/user/models/address.model';
import { AddressService } from 'src/app/user/service/address.service';
import { AddressDetailDialog } from '../address-detail.dialog/address-detail.dialog.component';
import { UserService } from '../../service/user.service';
import { ShippingAddress } from 'src/app/cart/model/shipping-address.model';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent {
  @Input() address!: Address | ShippingAddress;
  @Input() editable!: boolean;

  constructor(
    private service: AddressService,
    private dialog: MatDialog,
    private userservice: UserService) { }

  editAddress() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(AddressDetailDialog, dialogConfig);
    dialogRef.componentInstance.userId = this.address.userId;
    dialogRef.componentInstance.addressId = this.address.id;
    return dialogRef.afterClosed().subscribe({ next: () => { this.userservice.loadCurrentUser(this.address.userId!) } });
  }

  @needConfirmation()
  deleteAddress() {
    this.service.delete(this.address.userId!, this.address.id!).subscribe({ next: () => { this.userservice.loadCurrentUser(this.address.userId!) } });
  }
}
