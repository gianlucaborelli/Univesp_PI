import { Component } from '@angular/core';
import { Produto } from '../produtos.model';
import { Router } from '@angular/router';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-produtos-pesquisa',
  templateUrl: './produtos-pesquisa.component.html',
  styleUrls: ['./produtos-pesquisa.component.css']
})
export class ProdutosPesquisaComponent {
  produtos: Produto[] = [];
  displayedColumns: string[] = ["id", "name", "obs", "acoes"];

  constructor(private service: ProdutosService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((resposta) => {
      console.log(resposta);
      this.produtos = resposta;
    });
  }

  navegarParaProdutosCadastro() {
    this.router.navigate(['/','produtoscadastro'])
    .then(nav => {
      console.log(nav); 
    }, err => {
      console.log(err) 
    });
  }
}
