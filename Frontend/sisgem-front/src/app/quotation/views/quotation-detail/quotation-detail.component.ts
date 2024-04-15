import { Component, DEFAULT_CURRENCY_CODE, LOCALE_ID, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Quotation } from 'src/app/quotation/models/quotation.model';
import { OrcamentoService } from 'src/app/quotation/service/quotation.service';
import { Location } from '@angular/common'
import { ProdutoPedido } from 'src/app/products/models/produto-pedido.model';
import { MatTableDataSource } from '@angular/material/table';
import { ProdutoPedidoService } from 'src/app/quotation/service/produto-pedido.service';
import { AddNewProductDialogComponent } from 'src/app/quotation/components/add-new-item-to-quotation/add-new-product-dialog.component';


@Component({
  selector: 'app-quotation-detail',
  templateUrl: './quotation-detail.component.html',
  styleUrls: ['./quotation-detail.component.scss'],
  providers: [
    {
        provide:  DEFAULT_CURRENCY_CODE,
        useValue: 'BRL'
    },]
})

export class QuotationDetailComponent implements OnInit {
  displayedColumns: string[] = ['name', 'precoUn', 'quantidade', 'precoTotal', 'acoes'];
  dataSource: MatTableDataSource<ProdutoPedido>;

  orcamento: Quotation = {
    finalDate:'',
    initialDate:'',
    id: '',
    totalPrice:'',
    address: null,
    user: null,
    quotedProducts: null
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
