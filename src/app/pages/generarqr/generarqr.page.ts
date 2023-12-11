import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/services/fire.service';


@Component({
  selector: 'app-generarqr',
  templateUrl: './generarqr.page.html',
  styleUrls: ['./generarqr.page.scss'],
})
export class GenerarqrPage implements OnInit {

  clase: any;
  clases: any[] = [];

  constructor(private fireService: FireService) {}

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
}
