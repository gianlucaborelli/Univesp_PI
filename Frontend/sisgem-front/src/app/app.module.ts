import { ENVIRONMENT_INITIALIZER, NgModule, importProvidersFrom, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
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
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ClienteDetailDialogComponent } from './components/views/clientes/clientes-cadastro/cliente-detail.dialog/cliente-detail.dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogService } from './service/confirm-dialog/dialog.service';
import { EnderecoCardComponent } from './components/views/clientes/clientes-cadastro/endereco-card/endereco-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { OrcamentoNovoCadastroComponent } from './components/views/orcamento/orcamento-novo-cadastro/orcamento-novo-cadastro.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProdutosDetailComponent } from './components/views/produtos/produtos-detail/produtos-detail.component';
import { SignInComponent } from './components/views/login/sign-in/sign-in.component';
import { AuthService } from './service/auth/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatRadioModule } from '@angular/material/radio';
import { AddNewProductDialogComponent } from './components/views/orcamento/orcamento-cadastro/add-new-product-dialog/add-new-product-dialog/add-new-product-dialog.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { SpinnerComponent } from './components/shared/spinner/spinner/spinner.component';
import { LoadingInterceptor } from './interceptor/loading/loading.interceptor';




export function initializeDialogService() {
  return () => {
    inject(DialogService)
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    OrcamentoPesquisaComponent,
    ClientesPesquisaComponent,
    ClientesCadastroComponent,
    OrcamentoCadastroComponent,
    ProdutosPesquisaComponent,
    ProdutosCadastroComponent,
    EnderecoCadastroDialogComponent,
    ClienteDetailDialogComponent,
    EnderecoCardComponent,
    OrcamentoNovoCadastroComponent,
    ProdutosDetailComponent,
    SignInComponent,
    AddNewProductDialogComponent,
    SpinnerComponent

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
    MatMenuModule,
    MatStepperModule,
    MatAutocompleteModule,
    FontAwesomeModule,
    MatRadioModule,
    MatDialogModule,

  ],
  providers: [
    importProvidersFrom(MatDialogModule),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useFactory: initializeDialogService,
      deps: [MatDialog],
      multi: true
    },
    {
      provide: MatDialogRef,
      useValue: {},
      multi: true
    }, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: LoadingInterceptor, 
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
