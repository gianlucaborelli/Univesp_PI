import { ENVIRONMENT_INITIALIZER, NgModule, importProvidersFrom, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './dashboard/admin/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './dashboard/user/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatBadgeModule} from '@angular/material/badge';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';

import { UserDetailComponent } from './user/views/user-detail/user-detail.component';
import { QuotationDetailComponent } from './quotation/views/quotation-detail/quotation-detail.component';
import { ProductSearchComponent } from './products/views/product-search/product-search.component';
import { ProductDetailComponent } from './products/views/product-detail/product-detail.component';
import { AddressDetailDialog } from './user/components/address-detail.dialog/address-detail.dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserDetailDialog } from './user/components/user-detail.dialog/user-detail.dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogService } from './components/decorator/confirm-dialog/dialog.service';
import { AddressCardComponent } from './user/components/address-card/address-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { OrcamentoNovoCadastroComponent } from './quotation/components/orcamento-novo-cadastro/orcamento-novo-cadastro.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProductDetailDialog } from './products/components/product-detail/product-detail.dialog.component';
import { SignInComponent } from './authentication/views/login-page/login-page.component';
import { AuthService } from './authentication/service/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatRadioModule } from '@angular/material/radio';
import { AddNewProductDialogComponent } from './quotation/components/add-new-item-to-quotation/add-new-product-dialog.component';
import { TokenInterceptor } from './components/interceptor/token/token.interceptor';
import { SpinnerComponent } from './components/shared/loader/spinner/spinner.component';
import { LoadingInterceptor } from './components/interceptor/loading/loading.interceptor';
import { SnackBarComponent } from './components/shared/snack-bar/snack-bar.component';
import { UserSearchComponent } from './user/views/user-search/user-search.component';
import { AdminDashboardComponent } from './dashboard/admin/admin-dashboard/admin-dashboard.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CartItemCardComponent } from './dashboard/user/component/cart-item-card/cart-item-card.component';
import { ShoppingPageComponent } from './dashboard/user/view/shopping-page/shopping-page.component';
import { ShoppingItemCardComponent } from './dashboard/user/component/shopping-item-card/shopping-item-card.component';
import { QuotationSearchComponent } from './quotation/views/quotation-search/quotation-search.component';

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
    UserSearchComponent,
    UserDetailComponent,
    QuotationSearchComponent,
    QuotationDetailComponent,
    ProductSearchComponent,
    ProductDetailComponent,
    AddressDetailDialog,
    UserDetailDialog,
    AddressCardComponent,
    OrcamentoNovoCadastroComponent,
    ProductDetailDialog,
    SignInComponent,
    AddNewProductDialogComponent,
    SpinnerComponent,
    SnackBarComponent,
    AdminDashboardComponent,
    CartItemCardComponent,
    ShoppingPageComponent,
    ShoppingItemCardComponent

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
    MatProgressBarModule,
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
    MatMomentDateModule,
    MatDialogModule,
    MatBadgeModule,
    FlexLayoutModule 

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
