import { Component, Inject } from "@angular/core";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { FormGroup, FormControl } from "@angular/forms";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import "moment/locale/pt";

@Component({
  selector: "app-orcamento",
  styleUrls: ["./orcamento-read.component.css"],
  templateUrl: "./orcamento-read.component.html",
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class OrcamentoReadComponent {
  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {}

  displayedColumns: string[] = ["cliente", "valorTotal", "dataInicio", "dataFim"];

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ["name", "weight", "symbol", "position"];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, "expand"];
  expandedElement: ProdutoPedido | null = null;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
}

export interface Orcamento {
  id: number;
  dataInicio: string;
  dataFim: string;
  valorTotal: number;
  cliente: Cliente;
  endereco: Endereco;
  produtoPedidos: ProdutoPedido[];
}

export interface Cliente {
  id: number;
  nome: string;
}

export interface Endereco {
  id: number;
  logradouro: string;
  numero: number;
  cidade: string;
  estado: string;
}

export interface ProdutoPedido {
  id: number;
  quantidade: number;
  preco: number;
  produto: Produto;
}

export interface Produto {
  id: number;
  name: string;
  estoque: number;
  descricao: string;
  precos: number;
}

const ELEMENT_DATA: Orcamento[] = [
  {
    id: 1,
    dataInicio: "2023-01-01",
    dataFim: "2023-01-10",
    valorTotal: 100.0,
    cliente: {
      id: 1,
      nome: "Cliente 1",
    },
    endereco: {
      id: 1,
      logradouro: "Rua A",
      numero: 10,
      cidade: "Cidade 1",
      estado: "Estado 1",
    },
    produtoPedidos: [
      {
        id: 1,
        quantidade: 2,
        preco: 20.0,
        produto: {
          id: 1,
          name: "Produto 1",
          estoque: 10,
          descricao: "Descrição do Produto 1",
          precos: 10.0,
        },
      },
      {
        id: 2,
        quantidade: 3,
        preco: 30.0,
        produto: {
          id: 2,
          name: "Produto 2",
          estoque: 15,
          descricao: "Descrição do Produto 2",
          precos: 12.0,
        },
      },
      {
        id: 3,
        quantidade: 1,
        preco: 15.0,
        produto: {
          id: 3,
          name: "Produto 3",
          estoque: 8,
          descricao: "Descrição do Produto 3",
          precos: 15.0,
        },
      },
      {
        id: 4,
        quantidade: 4,
        preco: 40.0,
        produto: {
          id: 4,
          name: "Produto 4",
          estoque: 20,
          descricao: "Descrição do Produto 4",
          precos: 10.0,
        },
      },
      {
        id: 5,
        quantidade: 2,
        preco: 24.0,
        produto: {
          id: 5,
          name: "Produto 5",
          estoque: 12,
          descricao: "Descrição do Produto 5",
          precos: 12.0,
        },
      },
    ],
  },
  {
    id: 2,
    dataInicio: "2023-02-01",
    dataFim: "2023-02-15",
    valorTotal: 150.0,
    cliente: {
      id: 2,
      nome: "Cliente 2",
    },
    endereco: {
      id: 2,
      logradouro: "Rua B",
      numero: 20,
      cidade: "Cidade 2",
      estado: "Estado 2",
    },
    produtoPedidos: [
      {
        id: 6,
        quantidade: 3,
        preco: 45.0,
        produto: {
          id: 6,
          name: "Produto 6",
          estoque: 18,
          descricao: "Descrição do Produto 6",
          precos: 15.0,
        },
      },
      {
        id: 7,
        quantidade: 2,
        preco: 30.0,
        produto: {
          id: 7,
          name: "Produto 7",
          estoque: 10,
          descricao: "Descrição do Produto 7",
          precos: 15.0,
        },
      },
      {
        id: 8,
        quantidade: 4,
        preco: 40.0,
        produto: {
          id: 8,
          name: "Produto 8",
          estoque: 16,
          descricao: "Descrição do Produto 8",
          precos: 10.0,
        },
      },
      {
        id: 9,
        quantidade: 1,
        preco: 12.0,
        produto: {
          id: 9,
          name: "Produto 9",
          estoque: 6,
          descricao: "Descrição do Produto 9",
          precos: 12.0,
        },
      },
      {
        id: 10,
        quantidade: 2,
        preco: 24.0,
        produto: {
          id: 10,
          name: "Produto 10",
          estoque: 12,
          descricao: "Descrição do Produto 10",
          precos: 12.0,
        },
      },
    ],
  },
];
