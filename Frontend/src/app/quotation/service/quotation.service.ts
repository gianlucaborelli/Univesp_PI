import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Quotation } from 'src/app/quotation/models/quotation.model';
import { environment } from 'src/environments/environment';
import { SnackBarService } from 'src/app/components/snack-bar/service/snack-bar.service';
import { BehaviorSubject, map } from 'rxjs';
import { SetQuotationStatus } from '../models/dto/set-quotation-status.model';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  baseUrl: String = environment.baseUrl;

  private currentQuotation$: BehaviorSubject<Quotation>;

  constructor(
    private http: HttpClient,
    private _snack: SnackBarService) {

    this.currentQuotation$ = new BehaviorSubject<Quotation>({
      id: '',
      finalDate: '',
      initialDate: '',
      totalPrice: 0,
      user: null,
      quotedProducts: [],
    });
  }

  private setCurrentQuotation(quotation: Quotation) {
    this.currentQuotation$.next(quotation);
  }

  loadCurrentQuotation(id: string) {
    const url = `${this.baseUrl}/quotations/${id}`;
    this.http.get<Quotation>(url).subscribe({
      next: (quotation) => {
        this.setCurrentQuotation(quotation);               
      },
      error: (err) => {
        this._snack.open(err.error.detail)
      }
    });
  } 

  getCurrentQuotation(): Observable<Quotation> {
    return this.currentQuotation$.pipe(
      map(quotation => quotation)
    );
  }

  findAll(): Observable<Quotation[]> {
    const url = `${this.baseUrl}/quotations`
    return this.http.get<Quotation[]>(url);
  }

  findById(id: String): Observable<Quotation> {
    const url = `${this.baseUrl}/quotation/${id}`
    return this.http.get<Quotation>(url)
  }  

  setStatus(id: string, status: SetQuotationStatus ): Observable<Quotation> {
    const url = `${this.baseUrl}/quotations/${id}/status`
    return this.http.put<Quotation>(url, status);
  }

  delete(id: String): Observable<Quotation> {
    const url = `${this.baseUrl}/quotation/${id}`
    return this.http.delete<Quotation>(url)
  }
}
