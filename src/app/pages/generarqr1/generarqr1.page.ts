import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/services/fire.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-generarqr1',
  templateUrl: './generarqr1.page.html',
  styleUrls: ['./generarqr1.page.scss'],
})
export class GenerarqrPage implements OnInit {

  clase: any;
  clases: any[] = [];

  // Variable para almacenar el código QR generado
  qrCodeData: string = '';

  constructor(
    private fireService: FireService,
    private barcodeScanner: BarcodeScanner
  ) {}

  ngOnInit() {
    this.cargarClase();
  }

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

  // Método para generar el código QR con información adicional
  generarQR() {
    // Combina el código de la clase y el mensaje adicional en una estructura de datos
    const qrDataObject = {
      clase: this.clase,
      mensaje: 'Estás presente', // Mensaje adicional
    };

    // Convierte la estructura de datos a una cadena JSON
    this.qrCodeData = JSON.stringify(qrDataObject);
  }

  // Método para escanear código QR
  async escanearQR() {
    const resultado = await this.barcodeScanner.scan();

    if (!resultado.cancelled) {
      // Parsea la información escaneada como un objeto JSON
      const qrDataObject = JSON.parse(resultado.text);

      // Accede a las propiedades y muestra la información
      const codigoClase = qrDataObject.clase;
      const mensaje = qrDataObject.mensaje;

      // Puedes mostrar la información como desees, por ejemplo, mediante alertas
      alert(`Código de Clase: ${codigoClase}\n${mensaje}`);
    }
  }

}
