import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../models/clientes.model';
import { ClientesService } from '../../../../service/cliente-service/clientes.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { EnderecoCadastroDialogComponent } from './endereco-cadastro.dialog/endereco-cadastro.dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClienteDetailDialogComponent } from './cliente-detail.dialog/cliente-detail.dialog.component';
import { __await } from 'tslib';

@Component({
  selector: 'app-cadastroclientes',
  templateUrl: './clientes-cadastro.component.html',
  styleUrls: ['./clientes-cadastro.component.css']
})

export class ClientesCadastroComponent implements OnInit {
  cliente: Cliente = {
    name: ``,
    obs: ``,
    enderecos: []
  };

  constructor(private service: ClientesService,
    private router: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.initClienteAdd();
    
    this.router.queryParams.subscribe(params => {
      const valor = params['parametro'];
      if (valor) {
        this.service.findById(valor).subscribe((cliente) => {
          this.cliente = cliente;
        })
      }
    });
  }

  public initClienteAdd() {
    this.router.queryParams.subscribe(params => {
      const valor = params['parametro'];
      if (valor) {
        this.service.enderecoAdd.subscribe((resposta) => {
          console.log(resposta);
          if (resposta) {
            this.service.findById(valor).subscribe((cliente) => {
              this.cliente = cliente;
            })
          }
        });
      }
    });
  }

  back(): void {
    this.location.back()
  }

  openAddAddressDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { idCliente: this.cliente.id };
    dialogConfig.width = "40%";
    this.dialog.open(EnderecoCadastroDialogComponent, dialogConfig);
  }

  openEditClienteDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { idCliente: this.cliente.id };
    dialogConfig.width = "40%";
    this.dialog.open(ClienteDetailDialogComponent, dialogConfig);
  }
}
