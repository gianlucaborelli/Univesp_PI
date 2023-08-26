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

  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private dialog: MatDialog
  ) { }

  displayedColumns: string[] = ['endereco', 'data', 'cliente', 'produtos'];

  columnsToDisplay = ['data', 'cliente', 'endereco', 'produtos'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null = null;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  openAddNewOrcamentoDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.height = "80%";
    this.dialog.open(OrcamentoNovoCadastroComponent, dialogConfig);
  }


}





export interface PeriodicElement {
  data: any;
  endereco: any;
  cliente: string;
  produtos: number;
  description: string;

}