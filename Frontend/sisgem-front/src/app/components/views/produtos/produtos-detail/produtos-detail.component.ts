import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/product-service/product.service';

@Component({
  selector: 'app-produtos-detail',
  templateUrl: './produtos-detail.component.html',
  styleUrls: ['./produtos-detail.component.css']
})
export class ProdutosDetailComponent implements OnInit {
  produto: Product = {
    name: ``,
    description: ``,
    stock: ``,
    price: ``
  };

  constructor(private dialogRef: MatDialogRef<ProdutosDetailComponent>,
    private service: ProductService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data: any) {
    if (data != null) {
      this.service.findById(data.idProduto).subscribe((resposta) => {
        console.log(resposta);
        this.produto = resposta;
      });
    }
  }

  ngOnInit() {

  }


  salvar() {
    console.log(this.produto);
    if (this.produto.id === undefined) {
      this.service.create(this.produto).subscribe((resposta) => {
        this.close();
        this.router.navigate(['/home/produtoscadastro'], { queryParams: { parametro: resposta.id } })
        this.service.mensagem('Produto cadastrado com sucesso!');
      }, err => {
        for (let i = 0; i < err.error.errors.length; i++) {
          this.service.mensagem(err.error.errors[i].message)
        }
      })
    } else {
      this.service.update(this.produto).subscribe((resposta) => {
        this.service.produtoUpdate.next(true)
        this.close();
        this.router.navigate(['home/produtoscadastro'], { queryParams: { parametro: resposta.id } })
        this.service.mensagem('Produto atualizado com sucesso!');
      }, err => {
        for (let i = 0; i < err.error.errors.length; i++) {
          this.service.mensagem(err.error.errors[i].message)
        }
      })
    }
  }
  close() {
    this.dialogRef.close();
  }
}
