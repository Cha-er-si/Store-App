import { Component, OnInit } from '@angular/core';
import { Product } from '../Interface/product-interface';
import { ProductService } from '../services/product.service';
import { QrCodeGenerateService } from '../services/qr-code-generate.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  dataString!: string;
  product!: Product;

  constructor(
    private qrcodeStringService: QrCodeGenerateService,
    private productService: ProductService
  ) {
    this.dataString = this.qrcodeStringService.getString();
  }

  ngOnInit() {
    console.log(this.product);
    console.log(this.dataString);

    this.productService.getProductById(this.dataString).subscribe((res) => {
      this.product = res;
      console.log(res);
    });
  }
}
