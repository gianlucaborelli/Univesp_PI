import { ENVIRONMENT_INITIALIZER, NgModule, importProvidersFrom, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { OrcamentoPesquisaComponent } from './components/views/orcamento/orcamento-pesquisa/orcamento-pesquisa.component';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { ClientesPesquisaComponent } from './components/views/clientes/clientes-pesquisa/clientes-pesquisa.component';
import { ClientesCadastroComponent } from './components/views/clientes/clientes-cadastro/clientes-cadastro.component';
import { OrcamentoCadastroComponent } from './components/views/orcamento/orcamento-cadastro/orcamento-cadastro.component';
import { ProdutosPesquisaComponent } from './components/views/produtos/produtos-pesquisa/produtos-pesquisa.component';
import { ProdutosCadastroComponent } from './components/views/produtos/produtos-cadastro/produtos-cadastro.component';
import { EnderecoCadastroDialogComponent } from './components/views/clientes/clientes-cadastro/endereco-cadastro.dialog/endereco-cadastro.dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClienteDetailDialogComponent } from './components/views/clientes/clientes-cadastro/cliente-detail.dialog/cliente-detail.dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogService } from './service/confirm-dialog/dialog.service';
import { EnderecoCardComponent } from './components/views/clientes/clientes-cadastro/endereco-card/endereco-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';


export function initializeDialogService() {
  return () => {
    inject(DialogService)
  };
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    OrcamentoPesquisaComponent,
    ClientesPesquisaComponent,
    ClientesCadastroComponent,
    OrcamentoCadastroComponent,
    ProdutosPesquisaComponent,
    ProdutosCadastroComponent,
    EnderecoCadastroDialogComponent,
    ClienteDetailDialogComponent,
    EnderecoCardComponent

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
    HttpClientModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatGridListModule,
    MatMenuModule
  ],
  providers: [
    importProvidersFrom(MatDialogModule),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useFactory: initializeDialogService,
      deps: [MatDialog],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
