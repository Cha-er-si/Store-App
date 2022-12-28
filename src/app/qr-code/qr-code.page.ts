import { Component, Input, OnInit } from '@angular/core';
import { QrCodeGenerateService } from '../services/qr-code-generate.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  @Input() dataString!: string;

  constructor(private qrcodeStringService: QrCodeGenerateService) {
    this.dataString = this.qrcodeStringService.getString();
  }

  ngOnInit() {}
}
