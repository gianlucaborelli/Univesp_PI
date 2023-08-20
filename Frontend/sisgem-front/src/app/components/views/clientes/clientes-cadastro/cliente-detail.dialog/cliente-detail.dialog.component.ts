import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientesService } from '../../clientes.service';
import { Cliente } from '../../clientes.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-detail.dialog',
  templateUrl: './cliente-detail.dialog.component.html',
  styleUrls: ['./cliente-detail.dialog.component.css']
})
export class ClienteDetailDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ClienteDetailDialogComponent>,
    private service: ClientesService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data: any) {
    if (data != null) {
      this.service.findById(data.idCliente).subscribe((resposta) => {
        console.log(resposta);
        this.cliente = resposta;
      });
    }
  }


  cliente: Cliente = {
    name: '',
    obs: ''
  }

  name = new FormControl("", [Validators.minLength(3)]);

  ngOnInit() {

  }

  salvar() {
    if (this.cliente.id === undefined) {
      this.service.create(this.cliente).subscribe((resposta) => {
        this.close();
        this.router.navigate(['clientescadastro'], { queryParams: { parametro: resposta.id } })
        this.service.mensagem('Cliente cadastrado com sucesso!');
      }, err => {
        for (let i = 0; i < err.error.errors.length; i++) {
          this.service.mensagem(err.error.errors[i].message)
        }
      })
    } else {
      this.service.update(this.cliente).subscribe((resposta) => {
        this.close();
        this.router.navigate(['clientescadastro'], { queryParams: { parametro: resposta.id } })
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


  close() {
    this.dialogRef.close();
  }
}
