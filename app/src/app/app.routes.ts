import { Routes } from '@angular/router';
import { WeatherDisplayComponent } from './pages/weather-display/weather-display.component';

export const routes: Routes = [
  { path: 'weather', component: WeatherDisplayComponent },
  { path: '', redirectTo: '/weather', pathMatch: 'full' },
];
