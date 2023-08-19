import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Endereco } from '../../clientes.model';

@Component({
  selector: 'app-endereco-cadastro.dialog',
  templateUrl: './endereco-cadastro.dialog.component.html',
  styleUrls: ['./endereco-cadastro.dialog.component.css']
})
export class EnderecoCadastroDialogComponent implements OnInit {
  idCliente: Number;

  endereco: Endereco = {
    idCliente: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    obs: ''
  }

  constructor(private dialogRef: MatDialogRef<EnderecoCadastroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.idCliente = data.idCliente;
  }

  ngOnInit() {

  }


  close() {
    this.dialogRef.close();
  }
}
