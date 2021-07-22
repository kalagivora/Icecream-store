import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'task4';

  constructor(
    private authService: AuthService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    if (
      localStorage.getItem('Products') == null ||
      localStorage.getItem('Products') == ''
    ) {
      this.getData();
    }
  }

  async getData() {
    var file = await fetch('../../assets/products.json');
    let data = await file.text();

    let products = JSON.parse(data);

    localStorage.setItem('Products', JSON.stringify(products));
  }
}
