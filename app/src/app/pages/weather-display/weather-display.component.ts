import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { LocationService } from '../../services/location.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WeatherIconComponent } from '../../components/weather-icon/weather-icon.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { City } from '../../interfaces/City';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [HttpClientModule, WeatherIconComponent, CommonModule, FormsModule],
  providers: [WeatherService, LocationService],
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.css',
})
export class WeatherDisplayComponent implements OnInit {
  weatherData: any;
  locations!: City[];
  selectedLocation: string = 'Quito';
  selectedPeriod: string = 'today';
  startDate: string = '';
  startDateRange: string = '';
  endDateRange: string = '';
  minDate: string = '';
  maxDate: string = '';
  minEndDate: string = '';

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.loadCities();
    this.loadWeatherData('Quito', 'today');
    this.setMinMaxDates();
  }

  setMinMaxDates(): void {
    const today = new Date();
    const pastYear = new Date(today);
    pastYear.setFullYear(pastYear.getFullYear() - 1);
    const futureFifteenDays = new Date(today);
    futureFifteenDays.setDate(futureFifteenDays.getDate() + 15);

    this.minDate = pastYear.toISOString().split('T')[0];
    this.maxDate = futureFifteenDays.toISOString().split('T')[0];
    this.minEndDate = this.startDate || this.minDate;
  }

  onStartDateChange(): void {
    this.minEndDate = this.startDate;
  }

  loadCities(): void {
    this.locationService.getCities().subscribe({
      next: (data: City[]) => {
        this.locations = data;
      },
      error: (error) => {
        console.error('Error fetching cities:', error);
      },
    });
  }

  onPeriodChange(): void {
    this.startDate = '';
    this.startDateRange = '';
    this.endDateRange = '';
  }

  loadWeatherData(location: string, startDate: string, endDate?: string) {
    this.weatherService.getWeather(location, startDate, endDate).subscribe({
      next: (data) => {
        this.weatherData = data;
      },
      error: (error) => {
        console.error('Error fetching weather data:', error);
      },
    });
  }

  fetchWeatherData(): void {
    let startDateToSend: string = '';
    let endDateToSend: string = '';

    switch (this.selectedPeriod) {
      case 'specificDate':
        startDateToSend = this.startDate;
        endDateToSend = this.startDate;
        break;
      case 'dateRange':
        startDateToSend = this.startDate;
        endDateToSend = this.endDateRange;
        break;
      default:
        startDateToSend = this.selectedPeriod;
        break;
    }

    console.log({
      location: this.selectedLocation,
      period: this.selectedPeriod,
      startDate: startDateToSend,
      endDate: endDateToSend,
    });

    this.loadWeatherData(this.selectedLocation, startDateToSend, endDateToSend);
  }
}
