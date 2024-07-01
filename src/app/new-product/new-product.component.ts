import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  productFormGroupe!: FormGroup;

  constructor(private fb: FormBuilder, private productService : ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productFormGroupe = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      price: this.fb.control(null, [Validators.required, Validators.min(5)]),
      promotion: this.fb.control(false, [Validators.required]),
    });
  }

  handleAddProduct() {
    let product = this.productFormGroupe.value;
    this.productService.addNewProduct(product).subscribe({
      next:(data: Product)=>{
        this.router.navigateByUrl("/admin/products");
        this.productFormGroupe.reset();
      } , error : err => {
        console.log(err);
      }

    });
  }

  getErrorMessage(fieldName: string, error: ValidationErrors): string {
    if(error['required']){
      return fieldName + " The field is required";
    }
    else if(error['minlength']) {
      return fieldName + " should have at least " + error['minlength']['requiredLength']+" characters";
    }else if(error['min']) {
      return fieldName + " should have min value of  " + error['min']['min']+" .";
    }
    else return "";
  }
}
