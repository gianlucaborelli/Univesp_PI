import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user.model';
import { SnackBarService } from 'src/app/components/snack-bar/service/snack-bar.service';

@Component({
  selector: 'app-user-detail.dialog',
  templateUrl: './user-detail.dialog.component.html',
  styleUrls: ['./user-detail.dialog.component.scss']
})
export class UserDetailDialog implements OnInit {

  constructor(private dialogRef: MatDialogRef<UserDetailDialog>,
    private service: UserService,
    private _snack: SnackBarService,
    @Inject(MAT_DIALOG_DATA) data: any) {

    this.dialogRef.disableClose = true;
    this.dialogRef.updateSize("40%");

    if (data != null) {
      this.service.findById(data.idCliente).subscribe((resposta) => {
        this.user = resposta;
      });
    }
  }

  user: User = {
    name: '',
    obs: ''
  }

  name = new FormControl("", [Validators.minLength(3)]);

  ngOnInit() {

  }

  salvar() {
    if (this.user.id === undefined) {
      this.service.create(this.user).subscribe((resposta) => {
        this.dialogRef.close(true);
        this._snack.open('Cliente cadastrado com sucesso!');
      }, err => {
        for (let i = 0; i < err.error.errors.length; i++) {
          this._snack.open(err.error.errors[i].message)
        }
      })
    } else {
      this.service.update(this.user).subscribe((resposta) => {        
        this.dialogRef.close(true);
        this._snack.open('Cliente atualizado com sucesso!');
      }, err => {
        for (let i = 0; i < err.error.errors.length; i++) {
          this._snack.open(err.error.errors[i].message)
        }
      })
    }
  }

  getMessage() {
    if (this.name.invalid) {
      return "O campo NOME deve conter entre 3 e 100 carateres";
    }

    return false;
  }
}
