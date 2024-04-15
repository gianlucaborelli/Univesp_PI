import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, catchError, map, startWith, tap } from 'rxjs';
import { User } from 'src/app/user/models/user.model';
import { Address } from 'src/app/user/models/address.model';
import { ProdutoEmEstoque } from 'src/app/products/models/produto-em-estoque.model';
import { UserService } from 'src/app/user/service/user.service';
import { AddressService } from 'src/app/user/service/address.service';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ProductService } from 'src/app/products/service/product.service';
import { Quotation } from 'src/app/quotation/models/quotation.model';
import { OrcamentoService } from 'src/app/quotation/service/quotation.service';
import { format } from 'date-fns';
import { ProdutoPedidoService } from 'src/app/quotation/service/produto-pedido.service';
import { ProdutoExiste } from 'src/app/products/models/produto-existe.model';
import { AddItemToQuotation } from 'src/app/products/models/add-item-to-quotation.model';
import { needConfirmation } from 'src/app/components/decorator/confirm-dialog.decorator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orcamento-novo-cadastro',
  templateUrl: './orcamento-novo-cadastro.component.html',
  styleUrls: ['./orcamento-novo-cadastro.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})

export class OrcamentoNovoCadastroComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper | null = null;
  displayedColumnsEndereco: string[] = ["id", "logradouro", "localidade", "obs", "select"];
  displayedColumnsProdutos: string[] = ["id", "name", "price", "quantity", "desiredQuantity"];

  listaDeClientes!: User[];
  filterOptionsList!: Observable<User[]>;
  searchControl = new FormControl();

  enderecoDataSource: MatTableDataSource<Address>;
  produtosEmEstoqueDataSource: MatTableDataSource<ProdutoEmEstoque>;

  orcamento: Quotation = {
    totalPrice:'',
    quotedProducts: null
  };

  range: FormGroup;

  constructor(private dialogRef: MatDialogRef<OrcamentoNovoCadastroComponent>,
    private router: Router,
    private _formBuilder: FormBuilder,
    private clienteService: UserService,
    private enderecoService: AddressService,
    private produtoService: ProductService,
    private orcamentoService: OrcamentoService,
    private produtoPedidoService: ProdutoPedidoService) {
    this.enderecoDataSource = new MatTableDataSource<Address>();
    this.produtosEmEstoqueDataSource = new MatTableDataSource<ProdutoEmEstoque>();
    this.range = this._formBuilder.group({
      start: null,
      end: null,
    });
  }

  ngOnInit(): void {
    this.clienteService.findAll().subscribe((resposta) => {
      this.listaDeClientes = resposta;
      this.filterOptionsList = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      );
    });
  }

  private _filter(value: String): User[] {
    const filterValue = value.toLowerCase();
    return this.listaDeClientes.filter(cliente => cliente.name.toLowerCase().includes(filterValue)
    );
  }

  onClienteSelecionado(event: MatAutocompleteSelectedEvent): void {
    const selectedName = event.option.value;

    if (this.orcamento.user == null) {
      this.orcamento.user = this.listaDeClientes.find(cliente => cliente.name === selectedName);
    } else if (this.orcamento.user != selectedName) {
      this.orcamento.user = this.listaDeClientes.find(cliente => cliente.name === selectedName);
      this.orcamento.address = null;
    }

    this.findEnderecoByClienteId(this.orcamento.user?.id || 'valorPadrao');
    this.myStepper?.next();
  }

  findEnderecoByClienteId(id: String) {
    this.enderecoService.findAllByClienteId(id).subscribe((resposta) => {
      this.enderecoDataSource.data = resposta;
    });
  }

  onEnderecoSelecionado(endereco: any) {
    this.orcamento.address = endereco;

    if (this.orcamento.id != null) {
      this.atualizaOrcamento();
    }

    this.myStepper?.next();
  }

  onDateRangeChange(event: any): void {
    const startDate = this.range.get('start')?.value;
    const endDate = this.range.get('end')?.value;

    if (startDate && endDate) {
      this.consultarProdutosDisponiveis(startDate, endDate);

      this.orcamento.initialDate = format(new Date(startDate), 'dd/MM/yyyy');
      this.orcamento.finalDate = format(new Date(endDate), 'dd/MM/yyyy');

      if (this.orcamento.id == null) {
        this.criaOrcamento();
      } else {
        this.atualizaOrcamento();
      }
    }
  }

  consultarProdutosDisponiveis(startDate: Date, endDate: Date): void {
    this.produtoService.findProdutosDisponiveis(format(new Date(startDate), 'dd/MM/yyyy'),format(new Date(endDate), 'dd/MM/yyyy'))
      .pipe(
        tap((resposta) => {
          this.produtosEmEstoqueDataSource.data = resposta;
        }),
        catchError((error) => {
          console.error('Ocorreu um erro:', error);
          throw error;
        })
      )
      .subscribe();
  }

  criaOrcamento() {
    this.orcamentoService.create(this.orcamento)
      .pipe(
        tap((resposta) => {
          this.orcamento = resposta;
        }),
        catchError((error) => {
          console.error('Ocorreu um erro:', error);
          throw error;
        })
      )
      .subscribe();
  }

  atualizaOrcamento() {
    this.orcamentoService.update(this.orcamento)
      .pipe(
        tap((resposta) => {
          this.orcamento = resposta;
        }),
        catchError((error) => {
          console.error('Ocorreu um erro:', error);
          throw error;
        })
      )
      .subscribe();
  }

  onQuantityChange(novoProdutoPedido: any) {
    this.produtoPedidoService.produtoExiste(this.orcamento.id!, novoProdutoPedido.id)
      .pipe(
        tap((resposta) => {

          if (novoProdutoPedido.quantidadeDesejada == 0) {

            console.log("Deletando produto");
            this.deletaProdutoPedido(novoProdutoPedido.id);

          } else {
            console.log(resposta);
            
            if (resposta.id != null) {
              
              resposta.orcamentoId = this.orcamento.id;
              resposta.quantidade = novoProdutoPedido.quantidadeDesejada;
              this.atualizaProdutoPedido(resposta);
            } else {              
              console.log(novoProdutoPedido);
              this.addProdutoPedido(novoProdutoPedido)
            }
          }
        }),
        catchError((error) => {
          console.error('Ocorreu um erro:', error);
          throw error;
        })
      )
      .subscribe();
  }


  addProdutoPedido(novoPedido: any) {
    const pedido: AddItemToQuotation = {
      quantidade: novoPedido.quantidadeDesejada,
      produtoId: novoPedido.id,
      orcamentoId: this.orcamento.id!
    };

    console.log(pedido);
    this.produtoPedidoService.addProduto(pedido)
      .subscribe(
        (resposta) => {
          console.log(resposta);
        }),
      catchError((error) => {
        console.error('Ocorreu um erro:', error);
        throw error;
      })
  }

  deletaProdutoPedido(id: String) {
    this.produtoPedidoService.deleteProduto(id)
      .subscribe(),
      catchError((error) => {
        console.error('Ocorreu um erro:', error);
        throw error;
      })
  }


  atualizaProdutoPedido(pedidoAtualizado: ProdutoExiste) {
    console.log(pedidoAtualizado);

    this.produtoPedidoService.updateProduto(pedidoAtualizado)
      .pipe(
        tap((resposta) => {
          console.log(resposta);
        }),
        catchError((error) => {
          console.error('Ocorreu um erro:', error);
          throw error;
        })
      )
      .subscribe();
  }

  removerProdutoPedido() {
  }

  novoOrcamento = this._formBuilder.group({
    dadosDoCliente: this._formBuilder.group({
      searchControl: this._formBuilder.control('', Validators.required),
    }),
    enderecoDoCliente: this._formBuilder.group({
      enderecoControl: this._formBuilder.control('', Validators.required),
    }),
    selecaoDeProdutos: this._formBuilder.group({
      listaDeProdutos: this._formBuilder.control('', Validators.required),
    })
  })

  get DadosDoClienteForm() {
    return this.novoOrcamento.get("dadosDoCliente") as unknown as FormGroup;
  }
  get EnderecoDoClienteForm() {
    return this.novoOrcamento.get("enderecoDoCliente") as unknown as FormGroup;
  }
  get ProdutosDoOrcamentoForm() {
    return this.novoOrcamento.get("selecaoDeProdutos") as unknown as FormGroup;
  }

  HandleSubmit() {
    if (this.novoOrcamento.valid) {
      console.log(this.novoOrcamento.value);
    }
  }

  salvar() { 
    this.orcamentoService.orcamentoUpdate.next(true);    
    this.router.navigate(['cadastro-do-orcamento'], { queryParams: { parametro: this.orcamento.id! } })
    this.orcamentoService.mensagem('Orçamento criado com sucesso!');
    this.dialogRef.close();
  }

  @needConfirmation({
    title : "Realmente deseja sair sem salvar?",
    message : "Ao sair os dados não salvos serão perdidos",
  })
  close() {    
    if (this.orcamento.id != undefined){      
      this.orcamentoService.delete(this.orcamento.id).subscribe();
    }    
    this.dialogRef.close();
  }
}
