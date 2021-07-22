import { Injectable, OnInit } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  products: Product[] = [];
  selectedId: number = -1;

  // = [
  //   new Product(
  //     1,
  //     'Chocolate IceCream',
  //     100,
  //     'https://th.bing.com/th/id/Rfd616ab4c7d61cb5a6700891dbca97d6?rik=EJ8ykcKp3U%2bdRg&riu=http%3a%2f%2fwallpapersdsc.net%2fwp-content%2fuploads%2f2015%2f11%2fIce_Cream_4K5.jpg&ehk=WGNzekODCd0VZPiMhcZNJB%2bu%2b7ZVQqwZL%2bVipKfiIPs%3d&risl=&pid=ImgRaw'
  //   ),
  //   new Product(
  //     2,
  //     'Rainbow IceCream',
  //     150,
  //     'https://th.bing.com/th/id/OIP.GTXeH5fWidGL_w4HL0ViwwHaLH?pid=ImgDet&rs=1'
  //   ),
  //   new Product(
  //     3,
  //     'Blueberry IceCream',
  //     120,
  //     'https://th.bing.com/th/id/R42394edbda4391123a3bcc18d5cfaa18?rik=L8JSMdQSaRhS6A&riu=http%3a%2f%2fwww.recipesforthermomix.com%2frecipes-images%2fblueberry-ice-cream-thermomix.jpg&ehk=Bcn0nSG3dX7A3re6uAdmGz9g2Nk0YQI4oI6lfeWWLAM%3d&risl=&pid=ImgRaw'
  //   ),
  //   new Product(
  //     4,
  //     'Blueberry IceCream',
  //     120,
  //     'https://th.bing.com/th/id/R42394edbda4391123a3bcc18d5cfaa18?rik=L8JSMdQSaRhS6A&riu=http%3a%2f%2fwww.recipesforthermomix.com%2frecipes-images%2fblueberry-ice-cream-thermomix.jpg&ehk=Bcn0nSG3dX7A3re6uAdmGz9g2Nk0YQI4oI6lfeWWLAM%3d&risl=&pid=ImgRaw'
  //   ),
  // ];
  constructor() {}

  ngOnInit() {}

  getProducts() {
    if (localStorage.getItem('Products') != null) {
      let productsString = localStorage.getItem('Products');
      try {
        this.products = JSON.parse(productsString);
      } catch (error) {
        return [];
      }
      return this.products;
    }
    return [];
  }

  // async getData() {
  //   var file = await fetch('../../assets/products.json');
  //   let data = await file.text();

  //   this.products = JSON.parse(data);
  //   console.log(this.products);
  //   return this.products;
  // }

  addProduct(newProduct: Product) {
    this.products.push(newProduct);
    localStorage.setItem('Products', JSON.stringify(this.products));
    console.log('list after add:', this.products);
  }

  updateProduct(updatedProduct: Product, id: number) {
    let productIndex = this.products.findIndex((x) => x.productId == id);
    updatedProduct.productId = id;
    this.products[productIndex] = updatedProduct;
    localStorage.setItem('Products', JSON.stringify(this.products));
    console.log('list after Update:', this.products);
  }
}
