import { Component, Inject } from '@angular/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormGroup, FormControl, NumberValueAccessor } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import 'moment/locale/pt';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrcamentoNovoCadastroComponent } from '../orcamento-novo-cadastro/orcamento-novo-cadastro.component';
import { OrcamentoService } from 'src/app/service/orcamento/orcamento.service';
import { MatTableDataSource } from '@angular/material/table';
import { Orcamento } from 'src/app/models/orcamento.model';


@Component({
  selector: 'app-orcamento',
  styleUrls: ['./orcamento-pesquisa.component.css'],
  templateUrl: './orcamento-pesquisa.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
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


export class OrcamentoPesquisaComponent {
  displayedColumns: string[] = ['dataFim', 'dataInicio', 'cliente', 'endereco', 'produtosPedidos'];
  columnsForProdutosPedidos: string[] = ['preco', 'quantidade']; // Adicione mais colunas conforme necessário
  expandedElement: Orcamento | null | undefined;

  dataSource!: MatTableDataSource<Orcamento>;
  posts: any;

  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private dialog: MatDialog,
    private service: OrcamentoService,
  ) {
    this.service.findAll().subscribe((resposta) => {
      console.log(resposta);
      this.posts = resposta;
      this.dataSource = new MatTableDataSource(resposta);
    });
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  expandRow(orcamento: Orcamento) {
    this.expandedElement = this.expandedElement === orcamento ? null : orcamento;
  }

  openAddNewOrcamentoDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.height = "80%";
    this.dialog.open(OrcamentoNovoCadastroComponent, dialogConfig);
  }


}


