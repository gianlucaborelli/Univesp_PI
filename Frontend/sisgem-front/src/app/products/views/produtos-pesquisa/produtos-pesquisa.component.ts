import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { needConfirmation } from 'src/app/decorator/confirm-dialog.decorator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProdutosDetailComponent } from '../produtos-detail/produtos-detail.component';
import { ProductService } from 'src/app/products/service/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-produtos-pesquisa',
  templateUrl: './produtos-pesquisa.component.html',
  styleUrls: ['./produtos-pesquisa.component.scss']
})
export class ProdutosPesquisaComponent {
  dataSource!: MatTableDataSource<Product>;
  posts: any;
  displayedColumns: string[] = ["id", "name", "description", "acoes"];

  constructor(private service: ProductService, private router: Router, private dialog: MatDialog) {
    this.service.findAll().subscribe((resposta) => {
      console.log(resposta);
      this.posts = resposta;
      this.dataSource = new MatTableDataSource(resposta);
    });
  }

  ngOnInit(): void {
  }

  refreshTable() {
    this.service.findAll().subscribe((resposta) => {
      this.posts = resposta;
      this.dataSource = new MatTableDataSource(resposta);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navegarParaProdutosCadastro(productId?: String) {
    this.router.navigate(['/home/produtoscadastro'], { queryParams: { parametro: productId } })
      .then(nav => {
        console.log(nav);
      }, err => {
        console.log(err)
      });
  }

  openAddNewProductDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(ProdutosDetailComponent, dialogConfig);
  }

  @needConfirmation()
  deletarProduto(idCliente: String) {
    this.service.delete(idCliente).subscribe(() => {
      this.refreshTable(); 
    });
  }
}
