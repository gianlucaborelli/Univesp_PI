import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/app/models/address.model';
import { EnderecoService } from 'src/app/service/endereco.service';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-endereco-cadastro.dialog',
  templateUrl: './endereco-cadastro.dialog.component.html',
  styleUrls: ['./endereco-cadastro.dialog.component.css']
})
export class EnderecoCadastroDialogComponent implements OnInit {

  endereco: Address = {
    zipCode: '',
    userId: '',
    street: '',
    number: '',
    district: '',
    city: '',
    state: '',
    description: ''
  }

  constructor(private dialogRef: MatDialogRef<EnderecoCadastroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private service: EnderecoService,
    private clienteservice: UserService) {

    if (data != null) {
      if (data.idCliente != null) {
        this.endereco.userId = data.idCliente;
      } else if (data.enderecoId != null) {
        this.service.findById(data.enderecoId).subscribe((resposta) => {
          console.log(resposta);
          this.endereco = resposta;
        });
      }
    } else {
      this.service.mensagem("Sem dados para iniciar a interaçao com endereço!")
    }
  }

  ngOnInit() {
  }

  focusOutFunction() {
    this.service.findByCep(this.endereco.zipCode!).subscribe((resposta) => {
      this.endereco.street = resposta.logradouro;
      this.endereco.district = resposta.bairro;
      this.endereco.city = resposta.localidade;
      this.endereco.state = resposta.uf;
    }, err => {
      for (let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message)
      }
    });
  }

  salvar() {
    this.service.create(this.endereco).subscribe((resposta) => {
      this.clienteservice.enderecoAdd.next(true)
      this.close();
      this.service.mensagem('Endereço cadastrado com sucesso!');
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
