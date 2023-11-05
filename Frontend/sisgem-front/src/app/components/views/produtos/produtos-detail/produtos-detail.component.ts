import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produtos.model';
import { ProdutosService } from 'src/app/service/produto-service/produtos.service';

@Component({
  selector: 'app-produtos-detail',
  templateUrl: './produtos-detail.component.html',
  styleUrls: ['./produtos-detail.component.css']
})
export class ProdutosDetailComponent implements OnInit {
  produto: Produto = {
    name: ``,
    descricao: ``,
    estoque: ``,
    precos: ``
  };

  constructor(private dialogRef: MatDialogRef<ProdutosDetailComponent>,
    private service: ProdutosService,
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
        this.router.navigate(['produtoscadastro'], { queryParams: { parametro: resposta.id } })
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
        this.router.navigate(['produtoscadastro'], { queryParams: { parametro: resposta.id } })
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
