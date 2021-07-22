import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  public form: FormGroup;
  private arrayItems;

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.arrayItems = this.productService.getProducts();

    if (this.productService.selectedId == -1) {
      this.form = new FormGroup({
        productName: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        imagePath: new FormControl('', Validators.required),
      });
    } else {
      let product = this.productService
        .getProducts()
        .find((x) => x.productId == this.productService.selectedId);

      this.form = new FormGroup({
        productName: new FormControl(product.productName, Validators.required),
        price: new FormControl(product.price, Validators.required),
        imagePath: new FormControl(product.imagePath, Validators.required),
      });
    }
  }

  onSubmit(formData) {
    const lastElement = this.arrayItems.slice(-1);
    const id = lastElement[0].productId;

    const item: Product = {
      productId: id + 1,
      productName: formData.productName,
      price: formData.price,
      imagePath: formData.imagePath,
    };
    if (this.productService.selectedId == -1) {
      this.productService.addProduct(item);
    } else {
      this.productService.updateProduct(item, this.productService.selectedId);
    }
    this.router.navigate(['/admin-home']);
  }
}
