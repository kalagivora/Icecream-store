import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userDetails: User;
  products: any = [];
  productList;
  public searchedKeyword: string;
  constructor(
    private authService: AuthService,
    public productService: ProductsService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.userSubject.subscribe((user) => {
      this.userDetails = user;
    });
    // this.productService.getData();
    this.products = this.productService.getProducts();
    console.log(this.products);
  }

  onAddCart(product: Product, quantity: number) {
    this.cartService.addToCart(product, quantity);

    // this.router.navigate(['/cart']);
  }
}
