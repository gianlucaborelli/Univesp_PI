import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../user/service/user.service';
import { User } from '../../../user/models/user.model';

@Component({
  selector: 'app-cliente-detail.dialog',
  templateUrl: './cliente-detail.dialog.component.html',
  styleUrls: ['./cliente-detail.dialog.component.scss']
})
export class ClienteDetailDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ClienteDetailDialogComponent>,
    private service: UserService,
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
        this.service.mensagem('Cliente cadastrado com sucesso!');
      }, err => {
        for (let i = 0; i < err.error.errors.length; i++) {
          this.service.mensagem(err.error.errors[i].message)
        }
      })
    } else {
      this.service.update(this.user).subscribe((resposta) => {        
        this.dialogRef.close(true);
        this.service.mensagem('Cliente atualizado com sucesso!');
      }, err => {
        for (let i = 0; i < err.error.errors.length; i++) {
          this.service.mensagem(err.error.errors[i].message)
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
