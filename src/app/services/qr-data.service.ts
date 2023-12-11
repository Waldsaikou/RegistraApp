import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QrDataService {
  qrData: any;

  constructor() {}

  setQrData(data: any) {
    this.qrData = data;
  }

  getQrData() {
    return this.qrData;
  }
}