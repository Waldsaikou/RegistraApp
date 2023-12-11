// iniciarclase.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IniciarclasePageRoutingModule } from './iniciarclase-routing.module';
import { IniciarclasePage } from './iniciarclase.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciarclasePageRoutingModule,
    NgxQRCodeModule,
    QRCodeModule,
  ],
  declarations: [IniciarclasePage],
  providers: [BarcodeScanner],
})
export class IniciarclasePageModule {}
