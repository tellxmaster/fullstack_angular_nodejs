import { Routes } from '@angular/router';
import { WeatherDisplayComponent } from './pages/weather-display/weather-display.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: 'weather', component: WeatherDisplayComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/weather', pathMatch: 'full' },
];
