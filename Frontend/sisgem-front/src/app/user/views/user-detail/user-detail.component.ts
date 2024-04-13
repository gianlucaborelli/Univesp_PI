import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { EnderecoCadastroDialogComponent } from '../../components/endereco-cadastro.dialog/endereco-cadastro.dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { __await } from 'tslib';
import { ClienteDetailDialogComponent } from '../../components/cliente-detail.dialog/cliente-detail.dialog.component';
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
        dialogConfig.data = { idCliente: user.id };
        return this.dialog.open(EnderecoCadastroDialogComponent, dialogConfig).afterClosed();
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
        return this.dialog.open(ClienteDetailDialogComponent, dialogConfig).afterClosed();
      })
    ).subscribe(result => {
      if (result) {
        this.service.loadCurrentUser(this.userId);
      }
    });
  }
}
