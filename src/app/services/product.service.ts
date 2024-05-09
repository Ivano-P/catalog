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
      {id: UUID.UUID(), name: 'Microphone', price: 50, promotion: true},
      {id: UUID.UUID(), name: 'Webcam', price: 100, promotion: false},
      {id: UUID.UUID(), name: 'Router', price: 50, promotion: true},
      {id: UUID.UUID(), name: 'Switch', price: 100, promotion: false},
      {id: UUID.UUID(), name: 'Hub', price: 25, promotion: true},
      {id: UUID.UUID(), name: 'Firewall', price: 200, promotion: false},
      {id: UUID.UUID(), name: 'Access Point', price: 150, promotion: true},
      {id: UUID.UUID(), name: 'Modem', price: 50, promotion: false},
      {id: UUID.UUID(), name: 'Server', price: 500, promotion: true},
      {id: UUID.UUID(), name: 'NAS', price: 300, promotion: false},
      {id: UUID.UUID(), name: 'UPS', price: 100, promotion: true},
      {id: UUID.UUID(), name: 'Battery', price: 50, promotion: false},
      {id: UUID.UUID(), name: 'Charger', price: 25, promotion: true},
      {id: UUID.UUID(), name: 'Cable', price: 10, promotion: false},
      {id: UUID.UUID(), name: 'Adapter', price: 5, promotion: true},
      {id: UUID.UUID(), name: 'Bag', price: 20, promotion: false},
      {id: UUID.UUID(), name: 'Case', price: 15, promotion: true},
      {id: UUID.UUID(), name: 'Cover', price: 10, promotion: false},
      {id: UUID.UUID(), name: 'Stand', price: 5, promotion: true},
      {id: UUID.UUID(), name: 'Cooler', price: 10, promotion: false},
      {id: UUID.UUID(), name: 'Fan', price: 5, promotion: true},
      {id: UUID.UUID(), name: 'Heatsink', price: 10, promotion: false},
      {id: UUID.UUID(), name: 'Thermal Paste', price: 5, promotion: true},
      {id: UUID.UUID(), name: 'Memory', price: 50, promotion: false},
      {id: UUID.UUID(), name: 'Storage', price: 100, promotion: true},
      {id: UUID.UUID(), name: 'Processor', price: 300, promotion: false},
      {id: UUID.UUID(), name: 'Graphics Card', price: 500, promotion: true},
      {id: UUID.UUID(), name: 'Motherboard', price: 200, promotion: false},
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
}
