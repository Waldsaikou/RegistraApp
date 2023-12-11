import { Component, OnInit } from '@angular/core';
import { ClimaService } from 'src/app/clima.service';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
})
export class ClimaPage implements OnInit {
  myWeather: any;
  temperature: number = 0;
  temperature_min: number = 0;
  temperature_max: number = 0;
  wind: number = 0;
  humidity: number = 0;
  summary: string = '';
  iconURL: string = '';
  city: string = 'Puente Alto';
  units: string = 'metric';

  constructor(private climaService: ClimaService) {}

  ngOnInit(): void {
    // Al iniciar la página, cargar el clima para una ciudad predeterminada
    this.cargarClima();
  }

  cargarClima() {
    // Asegurarse de que haya un nombre de ciudad antes de realizar la llamada
    if (this.city.trim() !== '') {
      this.climaService.getWeather(this.city, this.units).subscribe({
        next: (res: any) => {
          console.log(res);
          this.myWeather = res;
          console.log(this.myWeather);
          this.temperature = this.myWeather.main.temp;
          this.temperature_min = this.myWeather.main.temp_min;
          this.temperature_max = this.myWeather.main.temp_max;
          this.wind = this.myWeather.wind.speed;
          this.humidity = this.myWeather.main.humidity;
          this.summary = this.myWeather.weather[0].main;

          this.iconURL =
            'https://openweathermap.org/img/wn/' +
            this.myWeather.weather[0].icon +
            '@2x.png';
        },
        error: (error) => console.log(error.message),
        complete: () => console.info('API Call completed'),
      });
    } else {
      // Manejar el caso en el que el nombre de la ciudad esté vacío
      console.log('Por favor, ingrese un nombre de ciudad válido.');
    }
  }
}
