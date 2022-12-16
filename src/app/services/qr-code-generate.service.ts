import { Injectable } from '@angular/core';
import { Product } from '../Interface/product-interface';

@Injectable({
  providedIn: 'root',
})
export class QrCodeGenerateService {
  qrcodeString!: string;
  product!: Product;

  constructor() {}
  setString(value: string) {
    this.qrcodeString = String(value);
  }

  getString() {
    return this.qrcodeString;
  }

  setProduct(product: Product) {
    this.product = product;
  }

  getProduct() {
    return this.product;
  }
}
