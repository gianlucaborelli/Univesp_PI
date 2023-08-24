import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/models/produtos.model';
import { ProdutosService } from 'src/app/service/produto-service/produtos.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-produtos-cadastro',
  templateUrl: './produtos-cadastro.component.html',
  styleUrls: ['./produtos-cadastro.component.css']
})
export class ProdutosCadastroComponent implements OnInit {
  produto: Produto = {
    name: ``,
    descricao: ``
  };


  constructor(private service: ProdutosService, private router: ActivatedRoute, private location: Location, private dialog: MatDialog) {
  }



  ngOnInit(): void {
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


  back(): void {
    this.location.back()
  }

}
