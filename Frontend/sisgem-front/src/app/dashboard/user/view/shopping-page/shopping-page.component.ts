import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoEmEstoque } from 'src/app/products/models/produto-em-estoque.model';
import { AvailableProductService } from 'src/app/products/service/availableProduct.service';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrl: './shopping-page.component.scss'
})
export class ShoppingPageComponent {
  availableProducts$: Observable<ProdutoEmEstoque[]> | undefined;

  constructor(
    private productService: AvailableProductService
  ){
    this.availableProducts$ = this.productService.getAvailableProducts()
  }
}