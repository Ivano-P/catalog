import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products! : Array<any>;
  constructor() { }

  ngOnInit() {
    this.products = [
      {id:1, name: 'Computer', price: 3500},
      {id:2, name: 'Mobile', price: 999},
      {id:3, name: 'Tablet', price: 500},
    ];
  }

}
