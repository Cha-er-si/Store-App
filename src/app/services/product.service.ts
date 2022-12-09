import { Injectable } from '@angular/core';

import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { initialize } from '@ionic/core';
import { Observable } from 'rxjs';
import { Product } from '../Interface/product-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: Firestore) {}

  getProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'products');
    return collectionData(productsRef, { idField: 'id' }) as Observable<
      Product[]
    >;
  }

  getProductById(id: string): Observable<Product> {
    const productsRef = doc(this.firestore, `products/${id}`);
    return docData(productsRef, { idField: 'id' }) as Observable<Product>;
  }

  addProduct(product: Product) {
    const productsRef = collection(this.firestore, 'products');
    return addDoc(productsRef, product);
  }

  deleteProduct(product: Product) {
    const productsRef = doc(this.firestore, `products/${product.id}`);
    return deleteDoc(productsRef);
  }

  updateProduct(product: Product) {
    const productsRef = doc(this.firestore, `products/${product.id}`);
    return updateDoc(productsRef, {
      product_name: product.product_name,
      product_price: product.product_price,
      product_bundle: product.product_bundle,
    });
  }
}
