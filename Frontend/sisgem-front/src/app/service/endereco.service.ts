import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address } from '../models/address.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnderecoAutocomplete } from '../models/endereco-autocomplete.model';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  baseUrl: String = environment.baseUrl;

  findById(id: String): Observable<Address> {
    const url = `${this.baseUrl}/enderecos/${id}`
    return this.http.get<Address>(url);
  }

  findAllByClienteId(id: String): Observable<Address[]> {
    const url = `${this.baseUrl}/users/${id}/address`
    return this.http.get<Address[]>(url);
  }

  findByCep(cep: String): Observable<EnderecoAutocomplete> {
    const url = `${this.baseUrl}/address/findByCep/${cep}`
    return this.http.get<EnderecoAutocomplete>(url);
  }

  create(body: Address): Observable<Address> {
    const url = `${this.baseUrl}/enderecos`;
    return this.http.post<Address>(url, body);
  }

  delete(id: String): Observable<Address> {
    const url = `${this.baseUrl}/enderecos/${id}`
    return this.http.delete<Address>(url);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
