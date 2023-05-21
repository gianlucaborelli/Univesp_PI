import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { OrcamentoReadComponent } from './components/views/orcamento/orcamento-read/orcamento-read.component';
import { ClientesComponent } from './components/views/clientes/clientes.component';
import { ProdutosComponent } from './components/views/produtos/produtos.component';
import { CadastroprodutosComponent } from './components/views/produtos/cadastroprodutos/cadastroprodutos.component';
import { CadastroclientesComponent } from './components/views/clientes/cadastroclientes/cadastroclientes.component';


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
    component: CadastroclientesComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
