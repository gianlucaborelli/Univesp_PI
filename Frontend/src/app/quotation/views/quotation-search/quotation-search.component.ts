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
import { OrcamentoNovoCadastroComponent } from '../../components/orcamento-novo-cadastro/orcamento-novo-cadastro.component';
import { QuotationService } from 'src/app/quotation/service/quotation.service';
import { MatTableDataSource } from '@angular/material/table';
import { Quotation } from 'src/app/quotation/models/quotation.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { needConfirmation } from 'src/app/components/decorator/confirm-dialog.decorator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotation',
  styleUrls: ['./quotation-search.component.scss'],
  templateUrl: './quotation-search.component.html',
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
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class QuotationSearchComponent {
  displayedColumns: string[] = ['user', 'initialDate', 'finalDate', 'address', 'total', 'status', 'actions'];
  
  dataSource!: MatTableDataSource<Quotation>;
  posts: any;

  constructor(
    private dialog: MatDialog,
    private service: QuotationService,
    private router: Router
  ) {

    this.service.findAll().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
      console.log(response)
    });
  }

  getColorByStatus(status: string): string {
    switch (status) {
      case 'PENDING': return '#d9a19e'; 
      case 'CONFIRMED': return '#e1e432';
      case 'AWAITING_PAYAMENT': return '#e7e698';
      case 'PAID': return '#a3a7fa'; 
      case 'CONCLUDED': return '#b9ca77';
      case 'CANCELED': return '#c0c0c0';
      default: return 'white'; 
    }
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  refreshTable() {
    this.service.findAll().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
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

  navegarParaOrcamentoCadastro(id: String) {
    this.router.navigate(['/home/cadastro-do-orcamento'], { queryParams: { parametro: id } })
      .then(nav => {
        console.log(nav);
      }, err => {
        console.log(err)
      });
  }

  @needConfirmation()
  deletarOrcamento(id: String) {
    this.service.delete(id).subscribe(() => {
      this.refreshTable();
    });
  }
}