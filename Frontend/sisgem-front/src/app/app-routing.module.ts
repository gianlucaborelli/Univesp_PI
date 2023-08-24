import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { OrcamentoPesquisaComponent } from './components/views/orcamento/orcamento-pesquisa/orcamento-pesquisa.component';
import { ClientesPesquisaComponent } from './components/views/clientes/clientes-pesquisa/clientes-pesquisa.component';
import { ClientesCadastroComponent } from './components/views/clientes/clientes-cadastro/clientes-cadastro.component';
import { OrcamentoCadastroComponent } from './components/views/orcamento/orcamento-cadastro/orcamento-cadastro.component';
import { ProdutosPesquisaComponent } from './components/views/produtos/produtos-pesquisa/produtos-pesquisa.component';
import { ProdutosCadastroComponent } from './components/views/produtos/produtos-cadastro/produtos-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  // C L I E N T E S
  {
    path: 'clientes',
    component: ClientesPesquisaComponent
  },
  {
    path: 'clientescadastro',
    component: ClientesCadastroComponent
  },

  // P R O D U T O S

  {
    path: 'produtos',
    component: ProdutosPesquisaComponent
  },
  {
    path: 'produtoscadastro',
    component: ProdutosCadastroComponent
  },

  // O R Ç A M E N T O S
  {
    path: 'orcamentos',
    component: OrcamentoPesquisaComponent
  },
  {
    path: 'fazerorcamento',
    component: OrcamentoCadastroComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
