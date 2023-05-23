import { Component, Inject } from '@angular/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormGroup, FormControl, NumberValueAccessor } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import 'moment/locale/pt';


@Component({
  selector: 'app-orcamento',
  styleUrls: ['./orcamento-read.component.css'],
  templateUrl: './orcamento-read.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],  
  providers: [    
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},    
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})


export class OrcamentoReadComponent {

  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ) {}

  displayedColumns: string[] = ['endereco', 'data', 'cliente', 'produtos','status'];

  columnsToDisplay = ['data', 'cliente', 'endereco', 'produtos','status'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null = null;  
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });  
}

export interface PeriodicElement {
  data: any;
  endereco: any;
  cliente: string;
  produtos: number;
  description: string;
  status: string;
}

