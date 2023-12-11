import { Injectable } from '@angular/core';

//import para utilizar fireStore:
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../pages/interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class FireService {
  isAuthenticated =  new BehaviorSubject(false);

  datos: any[] = [];
  dato: any = {};
  constructor(private fire: AngularFirestore, private router: Router) { }


  
  users : any [];
  //A través de estos metodos se realizan los distintos CRUD de cada alumno, profesor, "administrador", asistencia y asignatura. 
  async agregar(coleccion, value) {
    try {
      const docRef = await this.fire.collection(coleccion).add(value);
      return docRef.id;
    } catch (error) {
      console.error('Error al agregar documento:', error);
      return null; // O maneja el error de la manera que prefieras
    }
  }

  getDato(coleccion, id){
    try {
      var datos = this.fire.collection(coleccion).doc(id).get(); 
      console.log(datos,'error')
      return datos
      
      
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }

  getDatos(coleccion){
    try {
      
      var datos = this.fire.collection(coleccion).snapshotChanges();
      return datos
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }
  
  eliminar(coleccion, id){
    try {
      this.fire.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

  modificar(coleccion, id, value){
    try {
      this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

  getAuth(){
    return this.isAuthenticated.value;
  }

  logout(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  validameRutContra(rut, pass){
    return this.users.find(u => u.rut == rut && u.password == pass);
  }

//METODOS PARA LAS ASIGNATURAS 
async agregarClase(coleccion, value) {
  try {
    const docRef = await this.fire.collection(coleccion).add(value);
    return docRef.id;
  } catch (error) {
    console.error('Error al agregar clase:', error);
    return null;
  }
}
  
obtenenAsignatura(colleccion, id){
  try {
   var datos = this.fire.collection(colleccion).doc(id).get();
   console.log(datos, 'que wea esta pasando') 
   return datos
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

obtenenAsignaturas(colleccion){
    try {
      var datos = this.fire.collection(colleccion).snapshotChanges(); 
      return datos
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }
  
  
  
  eliminarClases(colleccion, id){
    try {
      this.fire.collection(colleccion).doc(id).delete();
    } catch (error) {
      console.log('ERROR: ',error)
    }
  }
  
  modificarClases(colleccion,id,value){
    try {
      this.fire.collection(colleccion).doc(id).set(value);
    } catch (error) {
      console.log('ERROR: ',error)
    }
  }

  async agregarAsistencia(coleccion, cod_class) {
    if (!cod_class) {
      console.error('El valor de cod_class es indefinido o inválido.');
      return null; // O maneja el error de la manera que prefieras
    }
  
    const asistencia = {
      cod_asistencia: '',
      cod_clase: cod_class,
      alumnos: []
    };
  
    try {
      const docRef = await this.fire.collection(coleccion).add(asistencia);
      return docRef.id;
    } catch (error) {
      console.error('Error al agregar asistencia:', error);
      return null;
    }
  }
  obtenerAsistencias(coleccion){
    try {
      return this.fire.collection(coleccion).snapshotChanges();
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }
  
  obtenerAsistencia(coleccion, id){
    try {
     return this.fire.collection(coleccion).doc(id).get();
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }
  
  agregarAlumnoASIST(coleccion,id,value){
    this.fire.collection(coleccion).doc(id).get().subscribe((doc) => {
      if (doc.exists) {
        const data = doc.data();
        console.log(data);
      } else {
        console.log('El documento no existe.');
      }
    });  
  }
  
  
  

}

  
  
/* getDatos2(colleccion){
    try {
      this.fire.collection(colleccion).snapshotChanges().subscribe(
        data => {
          this.datos = [];
          for(let d of data){
            this.datos.push(d.payload.doc.data());
          }
        }
      );
    } catch (error) {
      console.log('ERROR: ', error)
    }
  } */
