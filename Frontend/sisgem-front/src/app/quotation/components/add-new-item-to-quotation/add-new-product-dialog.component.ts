import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { AddItemToQuotation } from 'src/app/products/models/add-item-to-quotation.model';
import { ProdutoEmEstoque } from 'src/app/products/models/produto-em-estoque.model';
import { OrcamentoService } from 'src/app/quotation/service/quotation.service';
import { ProdutoPedidoService } from 'src/app/quotation/service/produto-pedido.service';
import { AvailableProductService } from 'src/app/products/service/availableProduct.service';
import { SnackBarService } from 'src/app/components/snack-bar/service/snack-bar.service';

@Component({
  selector: 'app-add-new-product-dialog',
  templateUrl: './add-new-product-dialog.component.html',
  styleUrls: ['./add-new-product-dialog.component.scss']
})
export class AddNewProductDialogComponent implements OnInit {
  @ViewChild('quantidadeInput') quantidade: ElementRef | null =null;
  @ViewChild('desejadaInput') desejado: ElementRef | null =null;

  formGroup: FormGroup;

  quantidadeValue: number = 0;
  desejadoValue: String = "";

  produtoAddPedido:AddItemToQuotation = {
    quantidade: '',
    produtoId: '',
    orcamentoId: ''
  };

  listaDeProdutoEmEstoque!: ProdutoEmEstoque[];
  filterOptionsList!: Observable<ProdutoEmEstoque[]>;
  searchControl = new FormControl();

  constructor(private dialogRef: MatDialogRef<AddNewProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private formBuilder: FormBuilder,
    private produtoPedidoService: ProdutoPedidoService,
    private orcamentoService: OrcamentoService,
    private produtoService: AvailableProductService,
    private _snack: SnackBarService) {
      
      this.formGroup = this.formBuilder.group({
        searchControl: [''] 
      });

    this.orcamentoService.findById(data.orcamentoId).subscribe((resposta) => {      
      this.produtoAddPedido.orcamentoId = resposta.id!; 
      this.produtoService.findProdutosDisponiveis(resposta.initialDate!, resposta.finalDate!).subscribe((resposta) => {        
        this.listaDeProdutoEmEstoque = resposta;
        this.filterOptionsList = this.searchControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || ''))
        );
      });
    });    
  }  

  ngOnInit() {
  }

  private _filter(value: String): ProdutoEmEstoque[] {
    const filterValue = value.toLowerCase();
    return this.listaDeProdutoEmEstoque.filter(produtoEmEstoque => produtoEmEstoque.name.toLowerCase().includes(filterValue)
    );
  }

  onProdutoEmEstoqueSelecionado(event: MatAutocompleteSelectedEvent): void {
    const selectedName = event.option.value;
    const produtoEmEstoque = this.listaDeProdutoEmEstoque.find(produtoPedido => produtoPedido.name === selectedName);
    
    if(produtoEmEstoque != null){      
      this.quantidadeValue = produtoEmEstoque.stock; 
      this.produtoAddPedido.produtoId = produtoEmEstoque.id; 
    }    
  }
  onQuantityChange(){
    this.produtoAddPedido.quantidade = this.desejadoValue;
    console.log(this.produtoAddPedido);
  }

  salvar() {
    this.produtoPedidoService.produtoExiste(this.produtoAddPedido.orcamentoId,this.produtoAddPedido.produtoId).subscribe((resposta) => {
      
      if (resposta.id == null){
        this.produtoPedidoService.addProduto(this.produtoAddPedido).subscribe((respostaAdd) => {
          this.orcamentoService.orcamentoUpdate.next(true);
          this.close()
          this._snack.open("Produto adicionado com sucesso");
        });        
      }else{
        this._snack.open("Produto ja existe no orçamento");
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
