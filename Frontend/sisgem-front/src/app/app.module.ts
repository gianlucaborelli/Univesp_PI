import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './components/views/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { OrcamentoReadComponent } from './components/views/orcamento/orcamento-read/orcamento-read.component';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { ClientesComponent } from './components/views/clientes/clientes.component';
import { ProdutosComponent } from './components/views/produtos/produtos.component';
import { CadastroprodutosComponent } from './components/views/produtos/cadastroprodutos/cadastroprodutos.component';
import { CadastroclientesComponent } from './components/views/clientes/cadastroclientes/cadastroclientes.component';
<<<<<<< HEAD
import { FazerorcamentoComponent } from './components/views/orcamento/fazerorcamento/fazerorcamento.component';
=======
import { NovoOrcamentoComponent } from './components/views/orcamento/novo-orcamento/novo-orcamento.component';
>>>>>>> 5e9be07bd824f23e14cf1d9bf969d076fb281aa2



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    OrcamentoReadComponent,
    ClientesComponent,
    ProdutosComponent,
    CadastroprodutosComponent,
    CadastroclientesComponent,
<<<<<<< HEAD
    FazerorcamentoComponent
=======
    NovoOrcamentoComponent
>>>>>>> 5e9be07bd824f23e14cf1d9bf969d076fb281aa2
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MomentDateModule,
    FormsModule,
 
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
