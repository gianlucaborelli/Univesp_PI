import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private formBuilder: FormBuilder,
    private service: ClientesService,
    private router: Router) { }

  cliente: Cliente = {
    name: '',
    obs: ''
  }



  ngOnInit() {

  }

  salvar() {
    this.service.create(this.cliente).subscribe((resposta) => {
      this.close();
      this.router.navigate(['clientescadastro'], { queryParams: { parametro: resposta.id } })
      this.service.mensagem('Cliente cadastrado com sucesso!');
    }, err => {
      for (let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message)
      }
    })
  }


  close() {
    this.dialogRef.close();
  }
}
