import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { OrcamentoReadComponent } from './components/views/orcamento/orcamento-read/orcamento-read.component';
import { ClientesComponent } from './components/views/clientes/clientes-pesquisa/clientes-pesquisa.component';
import { ProdutosComponent } from './components/views/produtos/produtos.component';
import { CadastroprodutosComponent } from './components/views/produtos/cadastroprodutos/cadastroprodutos.component';
import { ClientesCadastroComponent } from './components/views/clientes/clientes-cadastro/clientes-cadastro.component';
import { FazerorcamentoComponent } from './components/views/orcamento/fazerorcamento/fazerorcamento.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'clientes',
    component: ClientesComponent
  },

  {
    path: 'orcamentos',
    component: OrcamentoReadComponent
  },

  {
    path: 'produtos',
    component: ProdutosComponent
  },

  {
    path: 'cadastroprodutos',
    component: CadastroprodutosComponent
  },
  {
    path: 'cadastroclientes',
    component: ClientesCadastroComponent
  },
  {
    path: 'fazerorcamento',
    component: FazerorcamentoComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
