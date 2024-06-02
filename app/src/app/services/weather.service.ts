import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {
  private baseUrl: string = 'http://localhost:3000/weather';

  constructor(private http: HttpClient) {}

  getWeather(location: string, startDate: string, endDate?: string) {
    let queryParams = `location=${encodeURIComponent(
      location
    )}&startDate=${encodeURIComponent(startDate)}`;
    if (endDate) {
      queryParams += `&endDate=${encodeURIComponent(endDate)}`;
    }
    return this.http.get(`${this.baseUrl}?${queryParams}`);
  }
}
