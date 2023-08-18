import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes.model';
import { ClientesService } from '../clientes.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes-pesquisa.component.html',
  styleUrls: ['./clientes-pesquisa.component.css']
})
export class ClientesPesquisaComponent implements OnInit {


  clientes: Cliente[] = [];
  displayedColumns: string[] = ["id", "name", "obs", "acoes"];

  constructor(private service: ClientesService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((resposta) => {
      console.log(resposta);
      this.clientes = resposta;
    });
  }

  navegarParaClientesCadastro() {
    this.router.navigate(['clientescadastro'])
    .then(nav => {
      console.log(nav); 
    }, err => {
      console.log(err) 
    });
  }
}
