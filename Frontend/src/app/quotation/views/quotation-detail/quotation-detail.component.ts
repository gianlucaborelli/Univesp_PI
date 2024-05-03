import { Component, DEFAULT_CURRENCY_CODE, LOCALE_ID, OnInit } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Quotation } from 'src/app/quotation/models/quotation.model';
import { QuotationService } from 'src/app/quotation/service/quotation.service';
import { Location } from '@angular/common'
import { MatTableDataSource } from '@angular/material/table';
import { QuotedProduct } from '../../models/quoted-product.model';
import { Observable, map } from 'rxjs';



@Component({
  selector: 'app-quotation-detail',
  templateUrl: './quotation-detail.component.html',
  styleUrls: ['./quotation-detail.component.scss'],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },]
})

export class QuotationDetailComponent implements OnInit {
  displayedColumns: string[] = ['name', 'precoUn', 'quantidade', 'precoTotal', 'acoes'];
  quotationId: string = '';
  currentQuotation$: Observable<Quotation> | undefined;
  dataSource: MatTableDataSource<QuotedProduct>;

  constructor(
    private service: QuotationService,
    private router: ActivatedRoute,
    private dialog: MatDialog) {
    this.quotationId = String(this.router.snapshot.paramMap.get('id'));
    this.service.loadCurrentQuotation(this.quotationId);
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.currentQuotation$ = this.service.getCurrentQuotation();

    this.currentQuotation$.subscribe({
      next: (result) => {
        this.dataSource.data = result.quotedProducts;
      }
    })
  }

  setStatus(){}

}
