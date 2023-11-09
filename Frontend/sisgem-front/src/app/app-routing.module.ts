import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { OrcamentoPesquisaComponent } from './components/views/orcamento/orcamento-pesquisa/orcamento-pesquisa.component';
import { ClientesPesquisaComponent } from './components/views/clientes/clientes-pesquisa/clientes-pesquisa.component';
import { ClientesCadastroComponent } from './components/views/clientes/clientes-cadastro/clientes-cadastro.component';
import { OrcamentoCadastroComponent } from './components/views/orcamento/orcamento-cadastro/orcamento-cadastro.component';
import { ProdutosPesquisaComponent } from './components/views/produtos/produtos-pesquisa/produtos-pesquisa.component';
import { ProdutosCadastroComponent } from './components/views/produtos/produtos-cadastro/produtos-cadastro.component';
import { SecureInnerPageGuard } from './components/shared/guard/secure-inner-page.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [SecureInnerPageGuard]
  },

  // L O G I N
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  

  // C L I E N T E S
  {
    path: 'clientes',
    component: ClientesPesquisaComponent,
    canActivate: [SecureInnerPageGuard]
  },

  {
    path: 'clientescadastro',
    component: ClientesCadastroComponent,
    canActivate: [SecureInnerPageGuard]
  },

  // P R O D U T O S
  {
    path: 'produtos',
    component: ProdutosPesquisaComponent,
    canActivate: [SecureInnerPageGuard]
  },

  {
    path: 'produtoscadastro',
    component: ProdutosCadastroComponent,
    canActivate: [SecureInnerPageGuard]
  },

  // O R Ç A M E N T O S
  {
    path: 'orcamentos',
    component: OrcamentoPesquisaComponent,
    canActivate: [SecureInnerPageGuard]
  },

  {
    path: 'cadastro-do-orcamento',
    component: OrcamentoCadastroComponent,
    canActivate: [SecureInnerPageGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
