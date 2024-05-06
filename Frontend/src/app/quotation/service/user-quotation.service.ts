import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserStoreService } from 'src/app/authentication/service/user-store.service';
import { SnackBarService } from 'src/app/components/snack-bar/service/snack-bar.service';
import { environment } from 'src/environments/environment';
import { Quotation } from '../models/quotation.model';

@Injectable({
  providedIn: 'root'
})
export class UserQuotationService {
  baseUrl: String = environment.baseUrl;

  private currentQuotation$: BehaviorSubject<Quotation>;

  constructor(
    private http: HttpClient,
    private userStore: UserStoreService,
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
    const url = `${this.baseUrl}/users/${this.userStore.getId()}/quotations/${id}`
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

  findQuotationByUserId(userId: string): Observable<Quotation> {
    const url = `${this.baseUrl}/users/${this.userStore.getId()}/quotations/${userId}`
    return this.http.get<Quotation>(url);
  }

  findAllByUser(): Observable<Quotation[]> {
    const url = `${this.baseUrl}/users/${this.userStore.getId()}/quotations`
    return this.http.get<Quotation[]>(url);
  }
}
