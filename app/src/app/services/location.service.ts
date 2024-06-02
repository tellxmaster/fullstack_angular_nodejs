import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private baseUrl: string = environment.apiUrl + '/locations';

  constructor(private http: HttpClient) {}

  getCities(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
