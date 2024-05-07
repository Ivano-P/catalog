import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products!: Array<Product>;
  errorMessage!: string;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.handleGetAllProducts();
  }

  handleGetAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err;
      }
    });
  }

  handleDeleteProduct(p: Product) {
    let conf=confirm("are you sure you want to delete this product?");
    if(conf==false)return;
    this.productService.deleteProduct(p.id).subscribe({
      next: (data) => {
        //this.handleGetAllProducts(); //this would call the backend and refresh the list  heavy
        let index = this.products.indexOf(p); //this is faster
        this.products.splice(index, 1); //we splice the array to remove the product that was deleted
      }
    })
  }
}
