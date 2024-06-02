import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class WeatherService {
  private baseUrl: string = environment.apiUrl + '/weather';

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
