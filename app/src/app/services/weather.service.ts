import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class WeatherService {
  private baseUrl: string = environment.apiUrl + '/weather';

  constructor(private http: HttpClient) {}

  // Retrieves weather data for a specific location and time range
  getWeather(location: string, startDate: string, endDate?: string) {
    // Encode the location and start date parameters
    let queryParams = `location=${encodeURIComponent(
      location
    )}&startDate=${encodeURIComponent(startDate)}`;

    // Check if an end date is provided
    if (endDate) {
      // Encode the end date parameter
      queryParams += `&endDate=${encodeURIComponent(endDate)}`;
    }

    // Send a GET request to the weather API with the constructed query parameters
    return this.http.get(`${this.baseUrl}?${queryParams}`);
  }
}
