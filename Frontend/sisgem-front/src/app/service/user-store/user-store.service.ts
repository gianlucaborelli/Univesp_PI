import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  constructor() {
  }

  public getFullName(){
    return localStorage.getItem('userName');
  }

  public storeFullName(fullname:string){
    localStorage.setItem('userName', fullname);    
  }

  public getEmail(){
    return localStorage.getItem('userEmail');
  }

  public storeEmail(email:string){
    localStorage.setItem('userEmail', email);    
  }

  public getRole(){
    return localStorage.getItem('role');
  }

  public storeRole(role:string){
    localStorage.setItem('role', role);
  }
}
