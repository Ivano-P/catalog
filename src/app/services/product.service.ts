import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Product} from "../model/product.model";
import {UUID} from "angular2-uuid";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products!: Array<Product>;

  //placeholder backend db with list of test products
  constructor() {

    this.products = [
      {id:UUID.UUID(), name: 'Computer', price: 3500, promotion: true},
      {id:UUID.UUID(), name: 'Mobile', price: 999, promotion: false},
      {id:UUID.UUID(), name: 'Tablet', price: 500, promotion: true},
      {id:UUID.UUID(), name: 'Smartwatch', price: 200, promotion: false},

    ];
  }

  public getAllProducts() : Observable<Product[]> {
    let rnd = Math.random(); //to simulate random error
    if (rnd<0.1)return throwError(() => new Error("test random generator error"));
    else return of(this.products);

  }

  public deleteProduct (id:string) : Observable<boolean>{
     this.products = this.products.filter(p => p.id != id);
     return of(true);
  }

  public setPromotion(id : string) : Observable<Boolean>{
    let product= this.products.find(p=>p.id==id);
    if(product != undefined) {
      product.promotion = !product.promotion;
      return of(true);
    }else return throwError(() => new Error("Product not found"));
  }
}
