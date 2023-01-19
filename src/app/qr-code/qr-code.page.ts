import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Product } from '../Interface/product-interface';
import { ProductService } from '../services/product.service';
import { QrCodeGenerateService } from '../services/qr-code-generate.service';
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  dataString!: string;
  product!: Product;
  canvas!: HTMLCanvasElement;
  @ViewChild('canvasElement') canvaselement: any;
  constructor(
    private qrcodeStringService: QrCodeGenerateService,
    private productService: ProductService,
    private el: ElementRef
  ) {
    this.dataString = this.qrcodeStringService.getString();
    this.canvas = document.createElement('canvas');
  }

  ngOnInit() {
    // console.log(this.product);
    // console.log(this.dataString);

    this.productService.getProductById(this.dataString).subscribe((res) => {
      this.product = res;
      // console.log(res);
    });
    // domtoimage
    //   .toPng(this.el.nativeElement.querySelector('#canvasElement'))
    //   .then(function (dataUrl) {
    //     var img = new Image();
    //     img.src = dataUrl;
    //     console.log(dataUrl);
    //     document.body.appendChild(img);
    //   })
    //   .catch(function (error) {
    //     console.error('oops, something went wrong!', error);
    //   }),
    //   1000;
    // domtoimage
    //   .toPng(document.getElementById('canvasElement') as HTMLElement)
    //   .then(function (dataUrl) {
    //     var img = new Image();
    //     img.src = dataUrl;
    //     console.log(dataUrl);
    //     document.body.appendChild(img);
    //   })
    //   .catch(function (error) {
    //     console.error('oops, something went wrong!', error);
    //   }),
    //   1000;
  }

  ngAfterViewInit() {
    // const div = this.el.nativeElement.querySelector('#canvasElement');
    // this.canvas.width = div.clientWidth;
    // this.canvas.height = div.clientHeight;
    // const context = this.canvas.getContext('2d');
    // // context.drawImage(div, 0, 0);
    // const dataUrl = this.canvas.toDataURL();
    // this.saveToFile(dataUrl, 'fileName.png');
  }

  downloadQR() {
    const div: HTMLElement =
      this.el.nativeElement.querySelector('#canvasElement');
    // if (div) {
    //   html2canvas(div).then((canvas) => {
    //     const imgData = canvas.toDataURL('image/png');
    //     console.log(imgData);
    //     // you can use this data to create an image element and show it on the page
    //   });
    // } else {
    //   console.error('Capture div not found');
    // }
    const productname = this.product.product_name;
    domtoimage
      .toPng(div)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        console.log(dataUrl);
        var link = document.createElement('a');

        link.download = productname + '.png';
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      }),
      1000;
  }

  saveToFile(data: any, filename: string) {
    const blob = new Blob([data], { type: 'image/png' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
