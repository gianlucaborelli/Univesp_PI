import { Component, OnInit } from '@angular/core';
import { Cliente, Endereco } from '../clientes.model';
import { ClientesService } from '../clientes.service';
import { Router } from '@angular/router';

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
  } ;

  constructor(private service: ClientesService, private router: Router) {}

  ngOnInit(): void {
    this.findById();
  }

  findById() {
    this.service.findById( 1).subscribe((resposta) => {
      console.log(resposta);
      this.cliente = resposta;
    });
  }

  atualizarEndereco(endereco: Endereco){

  }

  excluirEndereco(endereco: Endereco ){

  }

}
