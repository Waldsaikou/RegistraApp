import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
//import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ClimaService } from './clima.service';
import { ClimaPage } from './pages/clima/clima.page';
import { ClimaPageModule } from './pages/clima/clima.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    ClimaPageModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    ClimaService,
    Geolocation,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

