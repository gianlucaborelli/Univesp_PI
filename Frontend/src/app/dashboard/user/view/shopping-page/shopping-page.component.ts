import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AvailableProduct } from 'src/app/products/models/available-product.model';
import { AvailableProductService } from 'src/app/products/service/available-product.service';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrl: './shopping-page.component.scss'
})
export class ShoppingPageComponent implements OnInit {
  availableProducts$: Observable<AvailableProduct[]> | undefined;

  constructor(
    private productService: AvailableProductService
  ){
    
  }
  ngOnInit(): void {
    this.availableProducts$ = this.productService.getAvailableProducts()
  }
}