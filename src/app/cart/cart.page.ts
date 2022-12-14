import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { debug } from 'console';
import { stringify } from 'querystring';
import { CartProduct } from '../Interface/cart-product-interface';
import { Product } from '../Interface/product-interface';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  @Input() id!: string;
  // cartProducts: Product[] = [];
  // cartProduct!: Product;
  totalPrice: number = 0;
  price: number = 0;
  // productCount: any[] = [];
  cartProducts: CartProduct[] = [];
  cartProductsUpdated: any = [];

  constructor(
    private productService: ProductService,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    // this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    // if (this.router.getCurrentNavigation()?.extras.state) {
    //   this.cartProduct = this.router.getCurrentNavigation()?.extras
    //     .state as Product;
    // } else {
    this.cartProducts = this.cartService.getProducts();

    // this.cartProducts.reduce((start, item) => start + item.product_price);

    // this.cartProducts.forEach((item) => {
    //   this.productPriceandCount.push(item.product_price, item.product_count);
    // });
    // this.productCount.forEach((item) => {
    //   this.productCountTotal += Number(item);
    // });
    // this.productPrice.forEach((item) => {
    //   this.productPriceTotal += Number(item);
    // });
    // this.totalPrice =
    //   Number(this.productCountTotal) * Number(this.productPriceTotal);
    // console.log(this.productPriceandCount);
    const arr = this.cartProducts;

    arr.forEach((item) => {
      this.totalPrice += item.product_count * item.product_price;
    });
    // console.log(this.totalPrice);
  }

  ngOnInit() {
    this.cartProducts = this.cartService.getProducts();
    const arr = this.cartProducts;

    // arr.forEach((item) => {
    //   this.totalPrice += item.product_count * item.product_price;
    // });
    // this.productService.getProductById(this.id).subscribe((res) => {
    //   this.cartProduct = res;
    //   this.cd.detectChanges();
    // });
    // this.cartProducts.push(this.cartProduct);
    // this.alert();
    // const arr = this.cartProducts;
    // const convert = (arr: Product[]) => {
    //   const res = {} as any;
    //   arr.forEach((obj) => {
    //     const key = `${obj.id}${obj.product_bundle}${obj.product_name}${obj.product_price}`;
    //     if (!res[key]) {
    //       res[key] = { ...obj, count: 0 };
    //     }
    //     res[key].count += 1;
    //   });
    //   return Object.values(res);
    // };
    // this.cartProductsWithCount = convert(arr);
    // console.log(this.cartProductsWithCount);
    // console.log(convert(arr));
    // const arr = this.cartProducts;
    // const convert = (arr: CartProduct[]) => {
    //   const res = {} as any;
    //   arr.forEach((obj) => {
    //     const key = `${obj.id}`;
    //     if (!res[key]) {
    //       res[key] = { ...obj };
    //     }
    //     res[key].product_count = Number(res[key].product_count);
    //     console.log(res);
    //   });
    //   return Object.values(res);
    // };
    // this.cartProductsUpdated = convert(arr);
    // console.log(this.cartProductsUpdated);
    // console.log(convert(arr));
  }

  checkCart() {
    // this.cartProducts.push(this.cartProduct);
    // console.log(this.cartProducts);
  }

  async clearCart() {
    this.cartService.clearCart();

    const toast = await this.toastController.create({
      message: 'Cart is cleared!',
      duration: 2000,
    });

    toast.present();

    this.router.navigate(['home']);
  }
}
