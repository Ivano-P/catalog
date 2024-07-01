import {Injectable} from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../model/product.model";
import {UUID} from "angular2-uuid";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products!: Array<Product>;

  //placeholder backend db with list of test products
  constructor() {

    this.products = [
      {id: UUID.UUID(), name: 'Computer', price: 3500, promotion: true},
      {id: UUID.UUID(), name: 'Mobile', price: 999, promotion: false},
      {id: UUID.UUID(), name: 'Tablet', price: 500, promotion: true},
      {id: UUID.UUID(), name: 'Smartwatch', price: 200, promotion: false},
      {id: UUID.UUID(), name: 'Headphones', price: 100, promotion: true},
      {id: UUID.UUID(), name: 'Keyboard', price: 50, promotion: false},
      {id: UUID.UUID(), name: 'Mouse', price: 25, promotion: true},
      {id: UUID.UUID(), name: 'Monitor', price: 300, promotion: false},
      {id: UUID.UUID(), name: 'Printer', price: 150, promotion: true},
      {id: UUID.UUID(), name: 'Scanner', price: 200, promotion: false},
      {id: UUID.UUID(), name: 'Projector', price: 500, promotion: true},
      {id: UUID.UUID(), name: 'Camera', price: 300, promotion: false},
      {id: UUID.UUID(), name: 'Drone', price: 1000, promotion: true},
      {id: UUID.UUID(), name: 'Speaker', price: 150, promotion: false},
      {id: UUID.UUID(), name: 'Computer', price: 3500, promotion: true},
      {id: UUID.UUID(), name: 'Computer', price: 3500, promotion: true},
      {id: UUID.UUID(), name: 'Computer', price: 3500, promotion: true},
      {id: UUID.UUID(), name: 'Computer', price: 3500, promotion: true},
      {id: UUID.UUID(), name: 'Computer', price: 3500, promotion: true},
      {id: UUID.UUID(), name: 'Computer', price: 3500, promotion: true},
      {id: UUID.UUID(), name: 'Computer', price: 3500, promotion: true},
      {id: UUID.UUID(), name: 'Computer', price: 3500, promotion: true},
      {id: UUID.UUID(), name: 'Computer', price: 3500, promotion: true},
      {id: UUID.UUID(), name: 'Computer', price: 3500, promotion: true},
      {id: UUID.UUID(), name: 'Mobile', price: 999, promotion: false},
      {id: UUID.UUID(), name: 'Mobile', price: 999, promotion: false},
      {id: UUID.UUID(), name: 'Mobile', price: 999, promotion: false},
      {id: UUID.UUID(), name: 'Mobile', price: 999, promotion: false},
      {id: UUID.UUID(), name: 'Mobile', price: 999, promotion: false},
      {id: UUID.UUID(), name: 'Mobile', price: 999, promotion: false},
      {id: UUID.UUID(), name: 'Mobile', price: 999, promotion: false},
      {id: UUID.UUID(), name: 'Tablet', price: 500, promotion: true},
      {id: UUID.UUID(), name: 'Tablet', price: 500, promotion: true},
      {id: UUID.UUID(), name: 'Tablet', price: 500, promotion: true},
      {id: UUID.UUID(), name: 'Tablet', price: 500, promotion: true},
      {id: UUID.UUID(), name: 'Tablet', price: 500, promotion: true},
      {id: UUID.UUID(), name: 'Tablet', price: 500, promotion: true},
      {id: UUID.UUID(), name: 'Tablet', price: 500, promotion: true},
      {id: UUID.UUID(), name: 'Tablet', price: 500, promotion: true}
    ];
  }

  public getAllProducts(): Observable<Product[]> {
    let rnd = Math.random(); //to simulate random error
    if (rnd < 0.1) return throwError(() => new Error("test random generator error"));
    else return of(this.products);
  }

  public getPageProducts(page:number, size:number): Observable<PageProduct> {
    let index = page*size;
    let totalPages = ~~(this.products.length / size);
    if (this.products.length % size != 0) totalPages++;
    let pageProducts = this.products.slice(index, index + size);
    return of({page:page,size:size,totalPages:totalPages,products:pageProducts});
  }

  //search products by keyword
  public searchProducts(keyword:string, page:number, size:number): Observable<PageProduct> {
    let result = this.products.filter(p => p.name.includes(keyword));
    let index = page*size;
    let totalPages = ~~(result.length / size);
    if (result.length % size != 0)
      totalPages++;
    let pageProducts = result.slice(index, index + size);
    return of({page:page,size:size,totalPages:totalPages,products:pageProducts});
  }

  public deleteProduct(id: string): Observable<boolean> {
    this.products = this.products.filter(p => p.id != id);
    return of(true);
  }

  public setPromotion(id: string): Observable<Boolean> {
    let product = this.products.find(p => p.id == id);
    if (product != undefined) {
      product.promotion = !product.promotion;
      return of(true);
    } else return throwError(() => new Error("Product not found"));
  }

  public addNewProduct(product: Product): Observable<Product> {
    product.id = UUID.UUID();
    this.products.push(product);
    return of(product);
  }

}
