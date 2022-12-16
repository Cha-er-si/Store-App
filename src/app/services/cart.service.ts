import { Injectable } from '@angular/core';
import { CartProduct } from '../Interface/cart-product-interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: CartProduct[] = [];
  price: number[] = [];

  constructor() {}

  addToCart(product: CartProduct) {
    this.products.push(product);
    this.price.push(product.product_price);
  }

  getProducts() {
    return this.products;
  }

  clearCart() {
    this.products = [];
    this.price = [];
    return this.products, this.price;
  }

  getTotalPrice() {
    return this.price.reduce((subtotal, item) => {
      return Number(subtotal) + Number(item);
    });
  }
}
