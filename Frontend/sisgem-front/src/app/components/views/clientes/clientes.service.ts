import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './clientes.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }
  
  baseUrl:String = 'http://localhost:8080'

  findAll():Observable<Cliente[]>{
    const url = `${this.baseUrl}/clientes`
    return this.http.get<Cliente[]>(url);
  }

  findById(id: Number ):Observable<Cliente>{
    const url = `${this.baseUrl}/clientes/${id}`
    return this.http.get<Cliente>(url);
  }
}
