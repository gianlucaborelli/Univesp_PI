import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/models/produtos.model';
import { ProdutosService } from 'src/app/service/produto-service/produtos.service';
import { Location } from '@angular/common'
import { ProdutosDetailComponent } from '../produtos-detail/produtos-detail.component';

@Component({
  selector: 'app-produtos-cadastro',
  templateUrl: './produtos-cadastro.component.html',
  styleUrls: ['./produtos-cadastro.component.css']
})
export class ProdutosCadastroComponent implements OnInit {
  produto: Produto = {
    name: ``,
    descricao: ``,
    estoque: ``,
    precos: ``
  };

  constructor(private service: ProdutosService,
    private router: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog) {
  }



  ngOnInit(): void {
    this.initProduto();

    this.router.queryParams.subscribe(params => {
      const valor = params['parametro'];
      if (valor) {
        this.service.findById(valor).subscribe((resposta) => {
          console.log(resposta);
          this.produto = resposta;
        });
      }
    });
  }

  public initProduto(){
    this.router.queryParams.subscribe(params => {
      const valor = params['parametro'];
      if (valor) {
        this.service.produtoUpdate.subscribe((resposta) => {
          console.log(resposta);
          if (resposta) {
            this.service.findById(valor).subscribe((produto) =>{
              this.produto= produto;
            })
          }
        });
      }
    }); 
  }


  back(): void {
    this.location.back()
  }

  openEditClienteDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { idProduto: this.produto.id };
    dialogConfig.width = "40%";
    this.dialog.open(ProdutosDetailComponent, dialogConfig);
  }

}
