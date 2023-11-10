import { Component, DEFAULT_CURRENCY_CODE, LOCALE_ID, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Orcamento } from 'src/app/models/orcamento.model';
import { OrcamentoService } from 'src/app/service/orcamento/orcamento.service';
import { Location } from '@angular/common'
import { ProdutoPedido } from 'src/app/models/produto-pedido.model';
import { MatTableDataSource } from '@angular/material/table';
import { ProdutoPedidoService } from 'src/app/service/produto-pedido/produto-pedido.service';
import { AddNewProductDialogComponent } from './add-new-product-dialog/add-new-product-dialog/add-new-product-dialog.component';

@Component({
  selector: 'app-orcamento-cadastro',
  templateUrl: './orcamento-cadastro.component.html',
  styleUrls: ['./orcamento-cadastro.component.css'],
  providers: [
    {
        provide:  DEFAULT_CURRENCY_CODE,
        useValue: 'BRL'
    },]
})

export class OrcamentoCadastroComponent implements OnInit {
  displayedColumns: string[] = ['name', 'precoUn', 'quantidade', 'precoTotal', 'acoes'];
  dataSource: MatTableDataSource<ProdutoPedido>;

  orcamento: Orcamento = {
    dataFim:'',
    dataInicio:'',
    id: '',
    valorTotal:'',
    endereco: null,
    cliente: null,
    produtosPedidos: null
  };  
  
  constructor(private service: OrcamentoService,
    private produtoPedidoService: ProdutoPedidoService,
    private router: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog) {
      this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {    
    
    this.initClienteAdd();

    this.router.queryParams.subscribe(params => {
      const valor = params['parametro'];
      if (valor) {
        this.service.findById(valor).subscribe((resposta) => {
          this.orcamento = resposta;    
          this.loadingProdutoPedidoList();     
        })
      }
    });
  }

  loadingProdutoPedidoList(){
    this.produtoPedidoService.getAllByOrcamentoId(this.orcamento.id!).subscribe((resposta) => {             
      console.log(resposta);
      this.dataSource.data = resposta;
      console.log(this.dataSource);
    })
  }

  public initClienteAdd() {
    this.router.queryParams.subscribe(params => {
      const valor = params['parametro'];
      if (valor) {
        this.service.orcamentoUpdate.subscribe((resposta) => {
          console.log(resposta);
          if (resposta) {
            this.service.findById(valor).subscribe((orcamento) => {
              this.orcamento = orcamento;
              this.loadingProdutoPedidoList();
            })
          }
        });
      }
    });
  }

  back(): void {
    this.location.back()
  }

  openAddNewProductDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { orcamentoId: this.orcamento.id };
    dialogConfig.width = "40%";
    this.dialog.open(AddNewProductDialogComponent, dialogConfig);
  }

  openAddAddressDialog(){}

  onOptionClick(){}

}
