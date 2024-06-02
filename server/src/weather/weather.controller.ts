import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  // GET request handler for retrieving weather data
  @Get()
  getWeather(
    @Query('location') location: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate?: string,
  ) {
    // Call the getWeather method of the WeatherService and return the result
    return this.weatherService.getWeather(location, startDate, endDate);
  }
}
