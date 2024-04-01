import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './dashboard/user/home/home.component';
import { OrcamentoPesquisaComponent } from './components/views/orcamento/orcamento-pesquisa/orcamento-pesquisa.component';

import { UserDetailComponent } from './user/views/user-detail/user-detail.component';
import { OrcamentoCadastroComponent } from './components/views/orcamento/orcamento-cadastro/orcamento-cadastro.component';
import { AuthGuard } from './components/shared/guard/auth.guard';
import { SignInComponent } from './authentication/views/login-page/login-page.component';
import { ProdutosPesquisaComponent } from './products/views/produtos-pesquisa/produtos-pesquisa.component';
import { ProdutosCadastroComponent } from './products/views/produtos-cadastro/produtos-cadastro.component';
import { UserSearchComponent } from './user/views/user-search/user-search.component';
import { AdminDashboardComponent } from './dashboard/admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // L O G I N
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      // C L I E N T E S
      {
        path: 'clientes',
        component: UserSearchComponent,
        canActivate: [AuthGuard],        
      },

      {
        path: 'clientescadastro',
        component: UserDetailComponent,
        canActivate: [AuthGuard]
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
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
