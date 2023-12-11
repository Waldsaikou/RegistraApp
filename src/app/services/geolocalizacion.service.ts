import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocalizacionService {

  constructor(private http: HttpClient) { }
  apiURL = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyADmYDN1BO17t5Jp6_FFfLKCnrGMBV1PLg&address=';

  getDireccion(direccion: string): Observable<any> {
    return this.http.get(this.apiURL + direccion).pipe(retry(3));
  }
}
