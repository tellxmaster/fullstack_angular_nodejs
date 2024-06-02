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
  isLoading: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService
  ) {}

  // Initialize component
  ngOnInit(): void {
    // Load cities
    this.loadCities();

    // Load weather data for Quito today
    this.loadWeatherData('Quito', 'today');

    // Set min and max dates for date picker
    this.setMinMaxDates();
  }

  // Set min and max dates for date picker
  setMinMaxDates(): void {
    // Calculate today's date
    const today = new Date();

    // Calculate the date one year ago from today
    const pastYear = new Date(today);
    pastYear.setFullYear(pastYear.getFullYear() - 1);

    // Calculate the date 15 days from today
    const futureFifteenDays = new Date(today);
    futureFifteenDays.setDate(futureFifteenDays.getDate() + 15);

    // Set the minimum date for the date picker to one year ago
    this.minDate = pastYear.toISOString().split('T')[0];

    // Set the maximum date for the date picker to 15 days from today
    this.maxDate = futureFifteenDays.toISOString().split('T')[0];

    // Set the minimum end date for the date range to either the selected start date or the minimum date
    this.minEndDate = this.startDate || this.minDate;
  }

  // Update the minimum end date for the date range when the start date changes
  onStartDateChange(): void {
    this.minEndDate = this.startDate;
  }

  // Load cities
  // This function is responsible for loading the cities data from the location service and storing it in the component's locations property.
  // It sets the isLoading flag to true before making the API call and sets it back to false after the API call is completed.
  // If there is an error while fetching the cities data, it logs the error to the console and sets the isLoading flag to false.
  loadCities(): void {
    this.isLoading = true;
    this.locationService.getCities().subscribe({
      next: (data: City[]) => {
        this.locations = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching cities:', error);
        this.isLoading = false;
      },
    });
  }

  // Reset start date and date range when the period changes
  onPeriodChange(): void {
    this.startDate = '';
    this.startDateRange = '';
    this.endDateRange = '';
  }

  // Load weather data
  // This function is responsible for loading the weather data from the weather service and storing it in the component's weatherData property.
  // It sets the isLoading flag to true before making the API call and sets it back to false after the API call is completed.
  // If there is an error while fetching the weather data, it logs the error to the console and sets the isLoading flag to false.
  loadWeatherData(location: string, startDate: string, endDate?: string) {
    this.isLoading = true;
    this.weatherService.getWeather(location, startDate, endDate).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching weather data:', error);
        this.isLoading = false;
      },
    });
  }

  // Fetch weather data
  // This function is responsible for fetching the weather data based on the selected location and period.
  // It determines the start and end dates to send to the API based on the selected period.
  // It then calls the loadWeatherData function to load the weather data from the weather service.
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
