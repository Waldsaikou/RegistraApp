import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  constructor(private http: HttpClient) { }

  getWeather(city: string, units: string) {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + ',CL&appid=0dc070609b5c3a1c00210d172c4de23e&units=' + units);
  }
  

  }



