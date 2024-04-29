import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/products/models/product.model';
import { Location } from '@angular/common'
import { ProductDetailDialog } from '../../components/product-detail/product-detail.dialog.component';
import { Observable, switchMap, take } from 'rxjs';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: string = '';
  currentProduct$: Observable<Product> | undefined;

  constructor(private service: ProductService,
    private router: ActivatedRoute,
    private dialog: MatDialog) {
    this.productId = String(this.router.snapshot.paramMap.get('id'));
    this.service.loadCurrentProducts(this.productId);
  }

  ngOnInit(): void {
    this.currentProduct$ = this.service.getCurrentProduct()
  }

  openEditClienteDialog() {
    this.currentProduct$!.pipe(
      take(1),
      switchMap(product => {
        const dialogConfig = new MatDialogConfig();
        const dialogRef = this.dialog.open(ProductDetailDialog, dialogConfig);
        dialogRef.componentInstance.productId = product.id;
        return dialogRef.afterClosed();
      })
    ).subscribe(result => {
      if (result) {
        this.service.loadCurrentProducts(this.productId);
      }
    });
  }
}
