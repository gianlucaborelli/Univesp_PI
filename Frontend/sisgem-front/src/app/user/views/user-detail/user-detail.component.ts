import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { AddressDetailDialog } from '../../components/address-detail.dialog/address-detail.dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { __await } from 'tslib';
import { UserDetailDialog } from '../../components/user-detail.dialog/user-detail.dialog.component';
import { Observable, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-userdetail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit {
  userId: string = '';
  currentUser$: Observable<User> | undefined;

  constructor(
    private service: UserService,
    private router: ActivatedRoute,
    private dialog: MatDialog) {
    this.userId = String(this.router.snapshot.paramMap.get('id'));
    this.service.loadCurrentUser(this.userId);
  }

  ngOnInit(): void {
    this.currentUser$ = this.service.getCurrentUser()
  }

  openAddAddressDialog() {
    this.currentUser$!.pipe(
      take(1),
      switchMap(user => {
        const dialogConfig = new MatDialogConfig();
        const dialogRef = this.dialog.open(AddressDetailDialog, dialogConfig);                
        dialogRef.componentInstance.userId = user.id;
        return dialogRef.afterClosed();
      })
    ).subscribe(result => {
      if (result) {
        this.service.loadCurrentUser(this.userId);
      }
    });
  }

  openEditClienteDialog() {
    this.currentUser$!.pipe(
      take(1),
      switchMap(user => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = { idCliente: user.id };
        return this.dialog.open(UserDetailDialog, dialogConfig).afterClosed();
      })
    ).subscribe(result => {
      if (result) {
        this.service.loadCurrentUser(this.userId);
      }
    });
  }
}
