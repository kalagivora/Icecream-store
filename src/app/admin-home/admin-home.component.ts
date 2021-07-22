import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  productList: any = [];
  constructor(private router: Router, public productService: ProductsService) {}

  ngOnInit(): void {
    this.productList = this.productService.getProducts();
    // this.productList = this.productService.products;
  }

  onAddProduct() {
    this.productService.selectedId = -1;
    this.router.navigate(['/add']);
  }

  onEdit(data) {
    this.productService.selectedId = data;
    this.router.navigate(['/add']);
  }

  onDelete(id) {
    this.productList = this.productList.filter((item) => item.productId != id);
    console.log('list after Delete:', this.productList);
    localStorage.setItem('Products', JSON.stringify(this.productList));
  }
}
