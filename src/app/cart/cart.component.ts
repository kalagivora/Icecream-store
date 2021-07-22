import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CartService } from '../services/cart.service';
import { PdfService } from '../services/pdf.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, AfterViewInit {
  cartItems: any = [];
  totalSum: number = 0;
  @ViewChild('invoice') invoice: ElementRef;
  constructor(
    private cartService: CartService,
    private pdfService: PdfService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
    console.log(this.cartItems);
  }

  totalPrice() {
    let sum = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      sum = sum + this.cartItems[i].price * this.cartItems[i].quantity;
    }
    this.totalSum = sum;
    return sum;
  }

  onDelete(cartItem) {
    this.cartItems = this.cartItems.filter((item) => item !== cartItem);
    console.log('delete::', this.cartItems);
  }

  generatePDF() {
    this.pdfService.generatePdf(this.cartItems, this.totalSum);
  }

  ngAfterViewInit() {}
}
