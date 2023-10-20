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
import { ProdutoPedido } from 'src/app/models/produto-pedido.model';
import { ClientesService } from 'src/app/service/cliente-service/clientes.service';
import { EnderecoService } from 'src/app/service/endereco.service';

@Component({
  selector: 'app-orcamento-novo-cadastro',
  templateUrl: './orcamento-novo-cadastro.component.html',
  styleUrls: ['./orcamento-novo-cadastro.component.css']
})
export class OrcamentoNovoCadastroComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper | null = null;
  displayedColumns: string[] = ["id", "logradouro", "localidade", "obs", "select"];

  listaDeClientes!: Cliente[];
  filterOptionsList!: Observable<Cliente[]>;
  searchControl = new FormControl();

  enderecoDataSource: MatTableDataSource<Endereco>;

  selectedAddress!: Endereco;

  selectedCliente: Cliente | undefined;

  produtosEmEstoque!: ProdutoEmEstoque[];
  produtosSelecionados!: ProdutoPedido[];


  constructor(private dialogRef: MatDialogRef<OrcamentoNovoCadastroComponent>,
    private _formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private enderecoService: EnderecoService) {
    this.enderecoDataSource = new MatTableDataSource<Endereco>();
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

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedName = event.option.value;
    this.selectedCliente = this.listaDeClientes.find(cliente => cliente.name === selectedName);
    console.log(this.selectedCliente);
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

  salvar() { }

  close() {
    this.dialogRef.close();
  }

  adicionarProduto(produto: any) {
    const produtoSelecionado = { ...produto, quantidade: 1 };
    this.produtosSelecionados.push(produtoSelecionado);
  }

  removerProduto(produto: any) {
    const index = this.produtosSelecionados.findIndex(p => p.id === produto.id);
    if (index !== -1) {
      this.produtosSelecionados.splice(index, 1);
    }
  }

  removerProdutoSelecionado(produto: any) {
    const index = this.produtosSelecionados.indexOf(produto);
    if (index !== -1) {
      this.produtosSelecionados.splice(index, 1);
    }
  }
}
