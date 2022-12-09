import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Product } from '../Interface/product-interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  @Input() id!: string;
  product!: Product;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  ngOnInit() {
    this.initializeStore();
  }

  initializeStore() {
    this.productService.getProductById(this.id).subscribe((res) => {
      this.product = res;
    });
  }

  async updateProduct() {
    await this.productService.updateProduct(this.product);
    this.router.navigate(['/']);
    const toast = await this.toastController.create({
      message: 'Product has been updated!',
      duration: 2000,
    });

    await toast.present();
  }

  async deleteProduct() {
    this.router.navigate(['/']);
    await this.productService.deleteProduct(this.product);
    const toast = await this.toastController.create({
      message: 'Product has been deleted!',
      duration: 2000,
    });

    await toast.present();
  }
}
