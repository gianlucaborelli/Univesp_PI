import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddressAutocomplete } from '../models/dto/address-autocomplete.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  baseUrl: String = environment.baseUrl;

  findById(id: String): Observable<Address> {
    const url = `${this.baseUrl}/enderecos/${id}`
    return this.http.get<Address>(url);
  }

  findAllByClienteId(id: String): Observable<Address[]> {
    const url = `${this.baseUrl}/users/${id}/address`
    return this.http.get<Address[]>(url);
  }

  findByCep(cep: String): Observable<AddressAutocomplete> {
    const url = `${this.baseUrl}/address/findByCep?cep=${cep}`
    return this.http.get<AddressAutocomplete>(url);
  }

  create(body: Address, userId: String): Observable<Address> {
    const url = `${this.baseUrl}/users/${userId}/address`;
    return this.http.post<Address>(url, body);
  }

  delete(id: String): Observable<Address> {
    const url = `${this.baseUrl}/enderecos/${id}`
    return this.http.delete<Address>(url);
  }  
}
