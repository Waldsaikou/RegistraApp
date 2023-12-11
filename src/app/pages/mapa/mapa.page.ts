import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx'
import { LoadingController, ToastController } from '@ionic/angular';
import { GeolocalizacionService } from '../../services/geolocalizacion.service';

// Importa explícitamente el módulo de Google Maps

declare var google;


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map: google.maps.Map = null; // Definir la variable local para this.map

  lat: number = 53.46319946467559;
  lng: number = -2.291306490754285;

  origen = { lat: 53.4690783348864, lng: -2.2810199388163097 }
  destino = { lat: 53.46319946467559, lng: -2.291306490754285 }

  direccionService = new google.maps.DirectionsService();
  direccionDibuja = new google.maps.DirectionsRenderer();

  dire: string;

  constructor(
    private geoLoca: Geolocation,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private api: GeolocalizacionService
  ) { }

  async loadMap() {
    const cargar = await this.loadingCtrl.create({
      message: "Cargando mapa..."
    });
    await cargar.present();
    const ubicacion = {
      lat: (await this.geoLoca.getCurrentPosition()).coords.latitude,
      lng: (await this.geoLoca.getCurrentPosition()).coords.longitude
    };
    const mapaHtml: HTMLElement = document.getElementById("map");
    this.map = new google.maps.Map(mapaHtml, {
      center: ubicacion,
      zoom: 20
    });
    this.direccionDibuja.setMap(this.map);
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      cargar.dismiss();

      const marcador = new google.maps.Marker({
        position: {
          lat: ubicacion.lat,
          lng: ubicacion.lng
        },
        zoom: 8,
        map: this.map,
      });
    });
  }

  ngOnInit() {
    this.loadMap();
  }

  Direccion() {
    console.log(this.dire);

    this.api.getDireccion(this.dire).subscribe(
      (data) => {
        console.log(data);

        if (data.results.length > 0) {
          const nuevaUbicacion = data.results[0].geometry.location;
          if (this.map) {
            this.map.setCenter(nuevaUbicacion);
          } else {
            this.mostrarMensajeError("El mapa no está definido.");
          }
        } else {
          this.mostrarMensajeError("No se encontraron resultados para la dirección proporcionada.");
        }
      },
      (error) => {
        console.log(error);
        this.mostrarMensajeError("Error al buscar la dirección.");
      }
    );
  }

  async mostrarMensajeError(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
