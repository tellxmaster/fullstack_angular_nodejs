import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { WeatherSummary } from './schemas/weather-summary.schema';

@Injectable()
/**
 * Service for fetching weather data.
 */
export class WeatherService {
  private baseUrl: string;
  private apiKey: string;

  /**
   * Constructs a new WeatherService instance.
   * @param configService - The configuration service used to retrieve API settings.
   */
  constructor(
    @InjectModel(WeatherSummary.name)
    private weatherSummaryModel: Model<WeatherSummary>,
    private configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('WEATHER_API_URL');
    this.apiKey = this.configService.get<string>('WEATHER_API_KEY');
  }

  /**
   * Retrieves weather data for a specific location and period.
   * @param location - The location for which to retrieve weather data.
   * @param period - The period for which to retrieve weather data [eg. today, yesterday, tomorrow, 2024-03-01].
   * @param endDate - Optional. The end date for the weather data period.
   * @returns A promise that resolves to the retrieved weather data.
   */
  async getWeather(
    location: string,
    period: string,
    endDate: string,
  ): Promise<any> {
    const query = {
      date: new Date().toDateString(),
      address: location,
    };
    // Find if a register exists for the current date and location
    const cachedData = await this.weatherSummaryModel.findOne(query);

    // Return cached data if it exists and is not older than 24 hours
    if (cachedData) {
      const currentTime = new Date();
      const cachedTime = new Date(cachedData.date);
      const timeDifference = Math.abs(
        currentTime.getTime() - cachedTime.getTime(),
      );
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

      if (hoursDifference <= 24) {
        return cachedData;
      }
    }

    // Build the URL for the weather API request based on the provided parameters
    let url = `${this.baseUrl}${location}/${period}`;
    if (endDate) {
      url += `/${endDate}`;
    }
    url += `?unitGroup=metric&key=${this.apiKey}&contentType=json`;

    // Fetch the weather data from the API and save it to the database
    try {
      const response = await axios.get(url);
      const filteredData = this.filterData(response.data);
      const newRecord = new this.weatherSummaryModel(filteredData);
      await newRecord.save();
      return filteredData;
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      return error.response.data;
    }
  }

  /**
   * Filters the retrieved weather data to extract relevant information.
   * @param data - The raw weather data to filter.
   * @returns The filtered weather data.
   */
  private filterData(data: any): any {
    return {
      date: new Date().toDateString(),
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      resolvedAddress: data.resolvedAddress || null,
      address: data.address || null,
      timezone: data.timezone || null,
      tzoffset: data.tzoffset || null,
      description: data.description || null,
      currentConditions: {
        temperature: data.currentConditions?.temp || null,
        feelsLike: data.currentConditions?.feelslike || null,
        humidity: data.currentConditions?.humidity || null,
        windSpeed: data.currentConditions?.windspeed || null,
        windDirection: data.currentConditions?.winddir || null,
        conditions: data.currentConditions?.conditions || null,
        icon: data.currentConditions?.icon || null,
      },
      dailySummaries:
        data.days?.map((day: any) => ({
          date: day.datetime || null,
          maxTemp: day.tempmax || null,
          minTemp: day.tempmin || null,
          precipitationProbability: day.precipprob || null,
          conditions: day.conditions || null,
          description: day.description || null,
          icon: day.icon || null,
        })) || [],
    };
  }
}
