import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Quotation } from 'src/app/quotation/models/quotation.model';
import { QuotedProduct } from 'src/app/quotation/models/quoted-product.model';
import { UserQuotationService } from 'src/app/quotation/service/user-quotation.service';

@Component({
  selector: 'app-history-detail-page',
  templateUrl: './history-detail-page.component.html',
  styleUrl: './history-detail-page.component.scss'
})
export class HistoryDetailPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'unitPrice', 'amount', 'totalPrice', 'actions'];
  quotationId: string = '';
  currentQuotation$: Observable<Quotation> | undefined;
  dataSource: MatTableDataSource<QuotedProduct>;


  constructor(
    private service: UserQuotationService,
    private router: ActivatedRoute) {
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
}
