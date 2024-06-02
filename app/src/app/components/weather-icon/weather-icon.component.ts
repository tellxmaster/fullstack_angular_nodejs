import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-icon',
  standalone: true,
  imports: [],
  templateUrl: './weather-icon.component.html',
  styleUrl: './weather-icon.component.css',
})
export class WeatherIconComponent implements OnInit {
  @Input() weatherType: string = '';
  @Input() size: string = '150px';

  constructor() {}

  ngOnInit(): void {}

  get iconUrl(): string {
    return `assets/images/weather-icons/${this.weatherType}.svg`;
  }
}
