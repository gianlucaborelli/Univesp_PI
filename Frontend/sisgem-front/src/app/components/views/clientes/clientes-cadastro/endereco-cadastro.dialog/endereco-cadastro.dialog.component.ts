import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Endereco } from 'src/app/models/endereco.model';
import { EnderecoService } from 'src/app/service/endereco.service';


@Component({
  selector: 'app-endereco-cadastro.dialog',
  templateUrl: './endereco-cadastro.dialog.component.html',
  styleUrls: ['./endereco-cadastro.dialog.component.css']
})
export class EnderecoCadastroDialogComponent implements OnInit {


  endereco: Endereco = {
    cep: '',
    clienteId: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    obs: ''
  }

  constructor(private dialogRef: MatDialogRef<EnderecoCadastroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private service: EnderecoService) {
    this.endereco.clienteId = data.idCliente;
  }

  ngOnInit() {
  }

  salvar() {
    this.service.create(this.endereco).subscribe((resposta) => {
      this.close();
      this.service.mensagem('Cliente atualizado com sucesso!');
    }, err => {
      for (let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message)
      }
    });
  }


  close() {
    this.dialogRef.close();
  }
}
