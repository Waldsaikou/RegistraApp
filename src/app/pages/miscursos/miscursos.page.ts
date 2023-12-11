import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-miscursos',
  templateUrl: './miscursos.page.html',
  styleUrls: ['./miscursos.page.scss'],
})
export class MiscursosPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private loadingCtrl: LoadingController,private fireService:FireService, private toastController: ToastController) { }
  rut: string;
  clases:any[]=[];
  clase: any;
  KEY_CLASES = 'clases'
  data: string = "google.com"

  asistencias: any[]=[];
  asisntencia: any;
  KEY_ASISTENCIAS = 'asistencias'

  Qrcode: any;
  asistenciaRegistrada = false;
  

  async ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    await this.cargarClases();
    await this.cargarAsistencias();
  }

async cargarClases(){
  this.fireService.obtenenAsignaturas('clases').subscribe(
   (data:any) => {
     this.clases = [];
     for(let c of data){
       let claseJson = c.payload.doc.data();
       claseJson['id'] = c.payload.doc.id;
       this.clases.push(claseJson);
     }
   }
 );
}

cargarAsistencias(){
  this.fireService.obtenerAsistencias('asistencias').subscribe(
   (data:any) => {
     this.asistencias = [];
     for(let a of data){
       let asistenciaJson = a.payload.doc.data();
       this.asistencias.push(asistenciaJson);
     }
   }
 );
}

/* cargarAsistencia(){
  this.fireService.obtenerAsistencia('asistencia',).
} */
async cargando(mensaje: string) {
  const loading = await this.loadingCtrl.create({
    message: mensaje,
    duration: 1000
  });
  loading.present();
}

ingresarAsistencia() {
  if (this.data) {
    // Verifica si la asistencia ya está registrada
    if (this.asistenciaRegistrada) {
      this.mostrarMensaje('Ya has registrado tu asistencia como presente.');
    } else {
      this.fireService.agregarAlumnoASIST(this.KEY_ASISTENCIAS, this.Qrcode, this.rut);
      this.cargando('Ingresando a la asistencia...');
      this.asistenciaRegistrada = true; // Cambia el estado de asistencia
    }
  } else {
    console.error('El objeto data es nulo o no contiene las propiedades esperadas.');
  }
}

// Función para mostrar un mensaje Toast
async mostrarMensaje(mensaje: string) {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: 2000,
  });
  toast.present();
}

}
