import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private baseUrl: string = 'http://localhost:3000/locations';

  constructor(private http: HttpClient) {}
  getCities(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
