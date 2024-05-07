import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Product} from "../model/product.model";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products!: Array<Product>;
  constructor() {
    this.products = [
      {id:1, name: 'Computer', price: 3500},
      {id:2, name: 'Mobile', price: 999},
      {id:3, name: 'Tablet', price: 500},
    ];
  }

  public getAllProducts() : Observable<Product[]> {
    let rnd = Math.random(); //to simulate random error
    if (rnd<0.1)return throwError(() => new Error("test random generator error"));
    else return of(this.products);

  }

  public deleteProduct (id:number) : Observable<boolean>{
     this.products = this.products.filter(p => p.id != id);
     return of(true);
  }
}
