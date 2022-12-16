import { TestBed } from '@angular/core/testing';

import { QrCodeGenerateService } from './qr-code-generate.service';

describe('QrCodeGenerateService', () => {
  let service: QrCodeGenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrCodeGenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
