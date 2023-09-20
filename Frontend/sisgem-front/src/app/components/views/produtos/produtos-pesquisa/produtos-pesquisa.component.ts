import { Component } from '@angular/core';
import { Produto } from '../../../../models/produtos.model';
import { Router } from '@angular/router';
import { ProdutosService } from '../../../../service/produto-service/produtos.service';
import { needConfirmation } from 'src/app/decorator/confirm-dialog.decorator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProdutosDetailComponent } from '../produtos-detail/produtos-detail.component';

@Component({
  selector: 'app-produtos-pesquisa',
  templateUrl: './produtos-pesquisa.component.html',
  styleUrls: ['./produtos-pesquisa.component.css']
})
export class ProdutosPesquisaComponent {
  dataSource!: MatTableDataSource<Produto>;
  posts: any;
  displayedColumns: string[] = ["id", "name", "descricao", "acoes"];

  constructor(private service: ProdutosService, private router: Router, private dialog: MatDialog) {
    this.service.findAll().subscribe((resposta) => {
      console.log(resposta);
      this.posts = resposta;
      this.dataSource = new MatTableDataSource(resposta);
    });
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navegarParaProdutosCadastro(productId?: String) {
    this.router.navigate(['produtoscadastro'], { queryParams: { parametro: productId } })
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
    this.service.delete(idCliente).subscribe();
  }
}
