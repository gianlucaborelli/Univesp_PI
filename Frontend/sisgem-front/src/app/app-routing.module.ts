import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './dashboard/user/home/home.component';
import { UserDetailComponent } from './user/views/user-detail/user-detail.component';
import { AuthGuard } from './components/shared/guard/auth.guard';
import { SignInComponent } from './authentication/views/login-page/login-page.component';
import { ProductSearchComponent } from './products/views/product-search/product-search.component';
import { ProductDetailComponent } from './products/views/product-detail/product-detail.component';
import { UserSearchComponent } from './user/views/user-search/user-search.component';
import { AdminDashboardComponent } from './dashboard/admin/admin-dashboard/admin-dashboard.component';
import { ShoppingPageComponent } from './dashboard/user/view/shopping-page/shopping-page.component';
import { QuotationSearchComponent } from './quotation/views/quotation-search/quotation-search.component';
import { QuotationDetailComponent } from './quotation/views/quotation-detail/quotation-detail.component';

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
        path: 'users',
        component: UserSearchComponent,
        canActivate: [AuthGuard],        
      },

      {
        path: 'users/:id',
        component: UserDetailComponent,
        canActivate: [AuthGuard]
      },

      // P R O D U T O S
      {
        path: 'products',
        component: ProductSearchComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'produtoscadastro',
        component: ProductDetailComponent,
        canActivate: [AuthGuard]
      },

      // O R Ç A M E N T O S
      {
        path: 'quotation',
        component: QuotationSearchComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'cadastro-do-orcamento',
        component: QuotationDetailComponent,
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
    children: [
      {
        path: 'shopping',
        component: ShoppingPageComponent,
        canActivate: [AuthGuard],        
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
