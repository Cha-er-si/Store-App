import { ChangeDetectorRef, Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { CartService } from './services/cart.service';
import { ProductService } from './services/product.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { QrCodeGenerateService } from './services/qr-code-generate.service';
import { Product } from './Interface/product-interface';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // products: Product[] = [];
  // cartProduct!: Product;
  // @Output() cartProducts: Product[] = [];
  // productFromQR!: Product;

  constructor() // private productService: ProductService,
  // private cd: ChangeDetectorRef,
  // private alertController: AlertController,
  // private router: Router,
  // private toastController: ToastController,
  // private cartService: CartService,
  // private barcodeScanner: BarcodeScanner,
  // private qrcodeService: QrCodeGenerateService,
  // private modalController: ModalController
  {}

  // scanQR() {
  //   this.barcodeScanner
  //     .scan()
  //     .then((barcodeData: any) => {
  //       console.log('Barcode data', barcodeData);
  //       this.productService
  //         .getProductById(String(barcodeData.text))
  //         .subscribe((res) => {
  //           // console.log(res);
  //           this.productFromQR = res;
  //         });

  //       this.addToCart(this.productFromQR);
  //       // console.log(this.productFromQR);
  //     })
  //     .catch((err: any) => {
  //       console.log('Error', err);
  //     });
  // }

  // async addToCart(product: Product) {
  //   const toast = await this.toastController.create({
  //     message: 'Product has been added to cart!',
  //     duration: 2000,
  //   });

  //   const alert = await this.alertController.create({
  //     header: 'Add Product',
  //     inputs: [
  //       {
  //         name: 'productName',
  //         placeholder: 'Product Name',
  //         value: product.product_name,
  //         disabled: true,
  //         type: 'text',
  //       },
  //       {
  //         name: 'productPrice',
  //         placeholder: `Product's Price`,
  //         value: product.product_price,
  //         disabled: true,
  //         type: 'number',
  //       },
  //       {
  //         name: 'productBundle',
  //         placeholder: 'e.g. per piece',
  //         value: product.product_bundle,
  //         disabled: true,
  //         type: 'text',
  //       },
  //       {
  //         name: 'productCount',
  //         placeholder: 'Quantity',
  //         type: 'number',
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //       },
  //       {
  //         text: 'Add',
  //         handler: (res) => {
  //           this.cartService.addToCart({
  //             ...product,
  //             product_count: res.productCount,
  //           });

  //           toast.present();
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }
}
