import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SnackBarService } from 'src/app/components/shared/snack-bar/service/snack-bar.service';
import { Cart } from '../model/cart.model';
import { environment } from 'src/environments/environment';
import { UserStoreService } from 'src/app/authentication/service/user-store.service';
import { AddItemDto } from '../model/dto/add-item-dto.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject = new BehaviorSubject<Cart>({
    userId: '',
    cartItens: []
  });

  cart$ = this.cartSubject.asObservable();

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient,
    private snackBar: SnackBarService,
    private userStore: UserStoreService) { }  

  private getUserCart(): Observable<Cart> {
    const url = `${this.baseUrl}/users/${this.userStore.getId()}/cart`;
    return this.http.get<Cart>(url);
  }

  private addItemToCart(itemToAdd: AddItemDto): Observable<Cart> {
    const url = `${this.baseUrl}/users/${this.userStore.getId()}/cart/${this.cartSubject.value.id}`;
    return this.http.put<Cart>(url, itemToAdd);
  }

  async loadUserCart(): Promise<void> {
    const resposta = await this.getUserCart().toPromise();
    this.cartSubject.next(resposta!);
  }

  async addItem(itemToAdd: AddItemDto): Promise<void> {
    const resposta = await this.addItemToCart(itemToAdd).toPromise();
    this.cartSubject.next(resposta!);
  }
}
