import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // cartItems = new Subject<any>();
  cartItems = [];
  constructor() {}

  getCartItems() {
    // return this.cartItems;
  }

  addToCart(product: Product, quantity) {
    console.log('cart Service::', product);

    const item = {
      id: product.productId,
      name: product.productName,
      price: product.price,
      quantity: quantity,
    };
    this.cartItems.push(item);
    // this.cartItems.next(item);
  }
}
