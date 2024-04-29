import { Component, DEFAULT_CURRENCY_CODE, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/components/snack-bar/service/snack-bar.service';
import { Product } from 'src/app/products/models/product.model';
import { ProductService } from '../../service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.dialog.component.html',
  styleUrls: ['./product-detail.dialog.component.scss'],
  providers:    [    
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }, 
  ],
})
export class ProductDetailDialog implements OnInit {
  @Input() productId: string | undefined;

  productForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ProductDetailDialog>,
    private formBuilder: FormBuilder,
    private service: ProductService,
    private _snack: SnackBarService,
    private router: Router) {

    this.dialogRef.disableClose = true;    
    this.dialogRef.updateSize("40%") ;

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      obs: ['']
    });
  }

  ngOnInit() {
    if (this.productId) {
      this.service.findById(this.productId).subscribe((response) => {
        this.productForm.get('name')!.setValue(response.name);
        this.productForm.get('price')!.setValue(response.price);
        this.productForm.get('stock')!.setValue(response.stock);
        this.productForm.get('obs')!.setValue(response.description);
      });
    }
  }


  save() {
    if (!this.productId) {
      this.service.create({
        name: this.productForm.get('name')!.value,
        price: this.productForm.get('price')!.value,
        stock: this.productForm.get('stock')!.value,
        description: this.productForm.get('obs')!.value
      }).subscribe({
        next: (response) => {
          this.dialogRef.close(response.id);
          this._snack.open('Produto cadastrado com sucesso!');
        },
        error: err => {
          this._snack.open(err.error.detail);
        }
      })
    } else {
      this.service.update({
        id: this.productId,
        name: this.productForm.get('name')!.value,
        price: this.productForm.get('price')!.value,
        stock: this.productForm.get('stock')!.value,
        description: this.productForm.get('obs')!.value
      }).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this._snack.open('Produto atualizado com sucesso!');
        },
        error: err => {
          this._snack.open(err.error.detail);
        }
      })
    }
  }
}
