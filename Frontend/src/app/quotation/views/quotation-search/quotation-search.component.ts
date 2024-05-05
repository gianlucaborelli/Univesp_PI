import { Component, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormGroup, FormControl } from '@angular/forms';
import { QuotationService } from 'src/app/quotation/service/quotation.service';
import { MatTableDataSource } from '@angular/material/table';
import { Quotation } from 'src/app/quotation/models/quotation.model';
import { needConfirmation } from 'src/app/components/decorator/confirm-dialog.decorator';

@Component({
  selector: 'app-quotation',
  styleUrls: ['./quotation-search.component.scss'],
  templateUrl: './quotation-search.component.html',
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }, 
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class QuotationSearchComponent {
  displayedColumns: string[] = ['user', 'initialDate', 'finalDate', 'address', 'total', 'status', 'actions'];
  
  dataSource!: MatTableDataSource<Quotation>;

  constructor(
    private service: QuotationService
  ) {
    this.service.findAll().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
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

  @needConfirmation()
  deletarOrcamento(id: String) {
    this.service.delete(id).subscribe(() => {
      this.refreshTable();
    });
  }
}