import { Component, ChangeDetectorRef, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { Product } from '../Interface/product-interface';
import { QrCodePage } from '../qr-code/qr-code.page';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { QrCodeGenerateService } from '../services/qr-code-generate.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products: Product[] = [];
  cartProduct!: Product;
  @Output() cartProducts: Product[] = [];
  productFromQR!: Product;

  constructor(
    private productService: ProductService,
    private cd: ChangeDetectorRef,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
    private cartService: CartService,
    private barcodeScanner: BarcodeScanner,
    private qrcodeService: QrCodeGenerateService,
    private modalController: ModalController
  ) {
    this.initializeStore();
  }

  initializeStore() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      const productSort = this.products.sort((a, b) =>
        a.product_name > b.product_name ? 1 : -1
      );
      this.products = productSort;
      this.cd.detectChanges();
    });
  }

  async generateQRCode(product: Product) {
    const modal = await this.modalController.create({
      component: QrCodePage,
      componentProps: { dataString: product.id },
      breakpoints: [0, 0.7, 0.1],
      initialBreakpoint: 0.7,
    });
    await modal.present();
  }

  scanQR() {
    this.barcodeScanner
      .scan()
      .then((barcodeData: any) => {
        console.log('Barcode data', barcodeData);
        this.productService
          .getProductById(String(barcodeData.text))
          .subscribe((res) => {
            // console.log(res);
            this.productFromQR = res;
          });

        this.addToCart(this.productFromQR);
        // console.log(this.productFromQR);
      })
      .catch((err: any) => {
        console.log('Error', err);
      });
  }

  async addToCart(product: Product) {
    const toast = await this.toastController.create({
      message: 'Product has been added to cart!',
      duration: 2000,
    });

    const alert = await this.alertController.create({
      header: 'Add Product',
      inputs: [
        {
          name: 'productName',
          placeholder: 'Product Name',
          value: product.product_name,
          disabled: true,
          type: 'text',
        },
        {
          name: 'productPrice',
          placeholder: `Product's Price`,
          value: product.product_price,
          disabled: true,
          type: 'number',
        },
        {
          name: 'productBundle',
          placeholder: 'e.g. per piece',
          value: product.product_bundle,
          disabled: true,
          type: 'text',
        },
        {
          name: 'productCount',
          placeholder: 'Quantity',
          type: 'number',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: (res) => {
            this.cartService.addToCart({
              ...product,
              product_count: res.productCount,
            });

            toast.present();
          },
        },
      ],
    });

    await alert.present();
  }

  async addProduct() {
    const toast = await this.toastController.create({
      message: 'Product has been created!',
      duration: 2000,
    });
    const alert = await this.alertController.create({
      header: 'Add Product',
      inputs: [
        {
          name: 'productName',
          placeholder: 'Product Name',
          type: 'text',
        },
        {
          name: 'productPrice',
          placeholder: `Product's Price`,
          type: 'number',
        },
        {
          name: 'productBundle',
          placeholder: 'e.g. per piece',
          type: 'text',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: (res) => {
            this.productService.addProduct({
              product_name: res.productName,
              product_price: res.productPrice,
              product_bundle: res.productBundle,
            });

            toast.present();
          },
        },
      ],
    });

    await alert.present();
  }

  searchText!: string;

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    // console.log(this.searchText);
  }

  async filterList($event: any) {
    const searchTerm = $event.srcElement.value;
    if (!searchTerm) {
      return;
    }

    this.productService.getProducts().subscribe((res) => {
      this.products = res.filter((item) => {
        if (item.product_name.toLowerCase().match(searchTerm.toLowerCase())) {
          return (
            item.product_name.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1
          );
        } else {
          return;
        }
      });
    });

    this.cd.detectChanges();
  }

  onClearButton() {
    this.initializeStore();
  }

  handleRefresh($event: any) {
    setTimeout(() => {
      this.initializeStore();
      $event.target.complete();
    }, 2000);
  }

  checkProductIfEmpty() {
    if (this.cartService.getProducts().length == 0) {
      this.emptyCartAlert();
    } else {
      this.router.navigate(['/cart/']);
    }
  }

  async emptyCartAlert() {
    const alert = await this.alertController.create({
      message: 'Cart is empty',
    });
    alert.present();
  }
}
