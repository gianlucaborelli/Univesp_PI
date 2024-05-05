import { Component, DEFAULT_CURRENCY_CODE, LOCALE_ID, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from 'src/app/components/snack-bar/service/snack-bar.service';
import { Quotation } from 'src/app/quotation/models/quotation.model';
import { QuotationService } from 'src/app/quotation/service/quotation.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  providers:[
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }, 
  ],
  styleUrl: './history-page.component.scss'
})
export class HistoryPageComponent implements OnInit {
  displayedColumns: string[] = ['user', 'initialDate', 'finalDate', 'address', 'total', 'status'];
  dataSource: MatTableDataSource<Quotation> = new MatTableDataSource<Quotation>();

  constructor(
    private quotationService: QuotationService,
    private _snack: SnackBarService
  ){}


  ngOnInit(): void {
    this.quotationService.findAllByUser().subscribe({
      next: (resposta) => {
        this.dataSource.data = resposta;                
      },
      error: (err) => {
        this._snack.open(err.error.detail);
      }
    });
  }



  selectQuotation(quotationId : string){

  }
}
