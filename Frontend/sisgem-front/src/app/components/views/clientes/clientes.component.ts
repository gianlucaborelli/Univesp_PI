import { Component, OnInit } from '@angular/core';
import { Cliente } from './clientes.model';
import { ClientesService } from './clientes.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


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

  navegarParaCategoriaCreate() {
    this.router.navigate(["categorias/create"])
  }

}
