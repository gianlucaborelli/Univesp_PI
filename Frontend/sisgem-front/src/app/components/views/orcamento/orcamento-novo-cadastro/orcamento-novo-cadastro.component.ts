import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { Cliente } from 'src/app/models/clientes.model';
import { Endereco } from 'src/app/models/endereco.model';
import { ProdutoEmEstoque } from 'src/app/models/produto-em-estoque.model';
import { ClientesService } from 'src/app/service/cliente-service/clientes.service';
import { EnderecoService } from 'src/app/service/endereco.service';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ProdutosService } from 'src/app/service/produto-service/produtos.service';
import { Orcamento } from 'src/app/models/orcamento.model';

@Component({
  selector: 'app-orcamento-novo-cadastro',
  templateUrl: './orcamento-novo-cadastro.component.html',
  styleUrls: ['./orcamento-novo-cadastro.component.css'],
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

  listaDeClientes!: Cliente[];
  filterOptionsList!: Observable<Cliente[]>;
  searchControl = new FormControl();

  enderecoDataSource: MatTableDataSource<Endereco>;
  produtosEmEstoqueDataSource: MatTableDataSource<ProdutoEmEstoque>;

  selectedAddress!: Endereco;
  selectedCliente: Cliente | undefined;

  orcamento: Orcamento = {};

  range: FormGroup;

  constructor(private dialogRef: MatDialogRef<OrcamentoNovoCadastroComponent>,
    private _formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private enderecoService: EnderecoService,
    private produtoService: ProdutosService,) {
    this.enderecoDataSource = new MatTableDataSource<Endereco>();
    this.produtosEmEstoqueDataSource = new MatTableDataSource<ProdutoEmEstoque>();
    this.range = this._formBuilder.group({
      start: null,
      end: null,
    });       
  }

  ngOnInit(): void {
    this.clienteService.findAll().subscribe((resposta) => {
      console.log(resposta);
      this.listaDeClientes = resposta;

      this.filterOptionsList = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      );
    });
  }

  private _filter(value: String): Cliente[] {
    const filterValue = value.toLowerCase();
    return this.listaDeClientes.filter(cliente => cliente.name.toLowerCase().includes(filterValue)
    );
  }

  onClienteSelecionado(event: MatAutocompleteSelectedEvent): void {
    const selectedName = event.option.value;

    if(this.orcamento?.cliente==null){
      this.selectedCliente = this.listaDeClientes.find(cliente => cliente.name === selectedName);      
      this.orcamento.cliente = this.selectedCliente;
      
      console.log(this.orcamento.cliente);
    }
    
    this.findEnderecoByClienteId(this.selectedCliente?.id || 'valorPadrao');

    this.myStepper?.next();
  }

  findEnderecoByClienteId(id: String) {
    this.enderecoService.findAllByClienteId(id).subscribe((resposta) => {
      console.log(resposta);
      this.enderecoDataSource.data = resposta;
    });
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

  onSelectionChange(endereco: any) {
    this.selectedAddress = endereco;

    console.log(this.selectedAddress);

    this.myStepper?.next();
  }

  HandleSubmit() {
    if (this.novoOrcamento.valid) {
      console.log(this.novoOrcamento.value);
    }
  }

  onDateRangeChange(event: any): void {
    const startDate = this.range.get('start')?.value;
    const endDate = this.range.get('end')?.value;

    if (startDate && endDate) {  
      this.consultarBancoDeDados(startDate, endDate);
    }
  }

  consultarBancoDeDados(startDate: Date, endDate: Date): void {
    this.produtoService.findProdutosDisponiveis(startDate, endDate).subscribe(
      (resposta) => {
        console.log(resposta);
        this.produtosEmEstoqueDataSource.data = resposta;
      },
      (error) => {
        console.error('Ocorreu um erro:', error);        
      }
    );
  }

  salvar() { }

  close() {
    this.dialogRef.close();
  }
}
