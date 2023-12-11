import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Generarqr1PageRoutingModule } from './generarqr1-routing.module';

import { GenerarqrPage } from './generarqr1.page';

import { QRCodeModule} from 'angularx-qrcode'

@NgModule({
  imports: [QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    Generarqr1PageRoutingModule
    
  ],
  declarations: [GenerarqrPage]
})
export class GenerarqrPageModule {}
