import { Component, ChangeDetectorRef, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Product } from '../Interface/product-interface';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products: Product[] = [];
  cartProduct!: Product;
  @Output() cartProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private cd: ChangeDetectorRef,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
    private cartService: CartService
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

  async addToCart(product: Product) {
    this.cartService.addToCart(product);

    const toast = await this.toastController.create({
      message: 'Product has been added to cart!',
      duration: 2000,
    });

    await toast.present();
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
