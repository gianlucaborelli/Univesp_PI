import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { AddProdutoPedido } from 'src/app/models/add-produto-pedido.model';
import { Orcamento } from 'src/app/models/orcamento.model';
import { ProdutoEmEstoque } from 'src/app/models/produto-em-estoque.model';
import { ProdutoPedido } from 'src/app/models/produto-pedido.model';
import { OrcamentoService } from 'src/app/service/quotation/quotation.service';
import { ProdutoPedidoService } from 'src/app/service/produto-pedido/produto-pedido.service';
import { ProductService } from 'src/app/service/product-service/product.service';

@Component({
  selector: 'app-add-new-product-dialog',
  templateUrl: './add-new-product-dialog.component.html',
  styleUrls: ['./add-new-product-dialog.component.css']
})
export class AddNewProductDialogComponent implements OnInit {
  @ViewChild('quantidadeInput') quantidade: ElementRef | null =null;
  @ViewChild('desejadaInput') desejado: ElementRef | null =null;

  formGroup: FormGroup;

  quantidadeValue: String = "";
  desejadoValue: String = "";

  produtoAddPedido:AddProdutoPedido = {
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
    private produtoService: ProductService) {
      
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
      this.quantidadeValue = produtoEmEstoque.estoque; 
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
          this.produtoPedidoService.mensagem("Produto adicionado com sucesso");
        });        
      }else{
        this.produtoPedidoService.mensagem("Produto ja existe no orçamento");
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
