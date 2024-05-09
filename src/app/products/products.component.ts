import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products!: Array<Product>;
  currentPage : number=0;
  pageSize : number=5;
  totalPages : number=0;

  errorMessage!: string;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.handleGetPageProducts()
  }

  handleGetPageProducts() {
    this.productService.getPageProducts(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = data.products;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        this.errorMessage = err;
      }
    });
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
    if(!conf)return;
    this.productService.deleteProduct(p.id).subscribe({
      next: (data) => {
        //this.handleGetAllProducts(); //this would call the backend and refresh the list  heavy
        let index = this.products.indexOf(p); //this is faster
        this.products.splice(index, 1); //we splice the array to remove the product that was deleted
      }
    })
  }

  togglePromotion(p: Product) {
    let promo = p.promotion;
    this.productService.setPromotion(p.id).subscribe({
      next: (data) => {
        p.promotion = !promo;
      },
      error: (err) => {
        this.errorMessage = err;
      }
    });
  }

  goToPage(i: number) {
    this.currentPage =i;
    this.handleGetPageProducts()
  }
}
