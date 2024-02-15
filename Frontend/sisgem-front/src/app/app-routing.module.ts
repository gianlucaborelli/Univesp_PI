import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { OrcamentoPesquisaComponent } from './components/views/orcamento/orcamento-pesquisa/orcamento-pesquisa.component';
import { ClientesPesquisaComponent } from './components/views/clientes/clientes-pesquisa/clientes-pesquisa.component';
import { ClientesCadastroComponent } from './components/views/clientes/clientes-cadastro/clientes-cadastro.component';
import { OrcamentoCadastroComponent } from './components/views/orcamento/orcamento-cadastro/orcamento-cadastro.component';
import { ProdutosPesquisaComponent } from './components/views/produtos/produtos-pesquisa/produtos-pesquisa.component';
import { ProdutosCadastroComponent } from './components/views/produtos/produtos-cadastro/produtos-cadastro.component';
import { AuthGuard } from './components/shared/guard/auth.guard';
import { SignInComponent } from './components/views/login/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // L O G I N
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      // C L I E N T E S
      {
        path: 'clientes',
        component: ClientesPesquisaComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'clientescadastro',
            component: ClientesCadastroComponent,
            canActivate: [AuthGuard]
          },
        ],
      },



      // P R O D U T O S
      {
        path: 'produtos',
        component: ProdutosPesquisaComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'produtoscadastro',
        component: ProdutosCadastroComponent,
        canActivate: [AuthGuard]
      },

      // O R Ç A M E N T O S
      {
        path: 'orcamentos',
        component: OrcamentoPesquisaComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'cadastro-do-orcamento',
        component: OrcamentoCadastroComponent,
        canActivate: [AuthGuard]
      }
    ]
  },

  {
    path: 'login',
    component: SignInComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
