// iniciarclase.page.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@Component({
  selector: 'app-iniciarclase',
  templateUrl: './iniciarclase.page.html',
  styleUrls: ['./iniciarclase.page.scss'],
})
export class IniciarclasePage implements OnInit {

  clase: any;
  clases: any[] = [];

  // Variable para almacenar el código QR generado
  qrCodeData: string = '';
  qrData: string = '';  // Cambié el valor inicial

  // Usuarios y docentes
  usuarios: any[] = [];
  docentes: any[] = [];

  rut: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private fireService: FireService,
    private barcodeScanner: BarcodeScanner,
    private router: Router,
    private navCtrl: NavController, 
  ) { }

  ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.listar();
    this.cargarClase();
  }
  
  // Método para generar el código QR
  generarQR() {
    this.qrCodeData = JSON.stringify({
      url: 'clases', // Cambia la URL según tus necesidades
      name: 'gian', // Cambia el nombre según tus necesidades
      token: '23' // Cambia el token según tus necesidades
    });
  }

  // Método para escanear código QR
  async escanearQR() {
    const resultado = await this.barcodeScanner.scan();
  
    if (!resultado.cancelled) {
      // Redirigir a google.com
      window.open('https://www.google.com', '_blank');
    }
  }

  // Método para listar usuarios
  listar() {
    this.fireService.getDatos('usuarios').subscribe(
      (data: any) => {
        this.usuarios = [];
        for (let u of data) {
          let usuarioJson = u.payload.doc.data();
          usuarioJson['id'] = u.payload.doc.id;
          this.usuarios.push(usuarioJson);
          this.docentes = this.usuarios.filter(u => u.tipo_usuario == 'profesor');
        }
      }
    );
  }
  
  navegarAGenerarQR() {
    // Puedes usar uno de los siguientes métodos según tus necesidades
    // Método 1: Navegación usando NavController
    this.navCtrl.navigateForward('/generarqr');

    // Método 2: Navegación usando Router
    // this.router.navigate(['/generarqr']);
  }
  // Método para cargar clases
  cargarClase() {
    this.fireService.obtenenAsignaturas('clases').subscribe(
      (data: any) => {
        this.clases = [];
        for (let c of data) {
          let claseJson = c.payload.doc.data();
          claseJson['id'] = c.payload.doc.id;
          this.clases.push(claseJson);
        }
      }
    );
  }
  
  mostrarQR() {
    this.generarQR();  // Asegúrate de generar el QR antes de mostrarlo
    this.qrData = this.qrCodeData;
  }
  
}
