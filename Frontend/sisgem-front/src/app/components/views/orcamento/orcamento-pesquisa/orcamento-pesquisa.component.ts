import { Component, Inject } from '@angular/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormGroup, FormControl } from '@angular/forms';
import 'moment/locale/pt';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrcamentoNovoCadastroComponent } from '../orcamento-novo-cadastro/orcamento-novo-cadastro.component';
import { OrcamentoService } from 'src/app/service/quotation/quotation.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Orcamento } from 'src/app/models/orcamento.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { needConfirmation } from 'src/app/decorator/confirm-dialog.decorator';
import { Router } from '@angular/router';
import { OrcamentoBase } from 'src/app/models/orcamento-base.model';

@Component({
  selector: 'app-orcamento',
  styleUrls: ['./orcamento-pesquisa.component.css'],
  templateUrl: './orcamento-pesquisa.component.html',  
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],  
})

export class OrcamentoPesquisaComponent {
  displayedColumns: string[] = ['dataInicio', 'dataFim',  'cliente', 'endereco', 'total', 'acoes'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  columnsForProdutosPedidos: string[] = ['name', 'preco', 'quantidade']; 
  expandedElement: Orcamento | null | undefined;

  dataSource!: MatTableDataSource<OrcamentoBase>;
  posts: any;

  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private dialog: MatDialog,
    private service: OrcamentoService,
    private router: Router
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

  refreshTable() {
    this.service.findAll().subscribe((resposta) => {
      this.posts = resposta;
      this.dataSource = new MatTableDataSource(resposta);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  

  openAddNewOrcamentoDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.height = "80%";
    this.dialog.open(OrcamentoNovoCadastroComponent, dialogConfig);
  }

  navegarParaOrcamentoCadastro(id: String){    
      this.router.navigate(['/home/cadastro-do-orcamento'], { queryParams: { parametro: id } })
        .then(nav => {
          console.log(nav);
        }, err => {
          console.log(err)
        });
    }

  @needConfirmation()
  deletarOrcamento(id: String){
    this.service.delete(id).subscribe(() => {
      this.refreshTable();
    });
  }  
}