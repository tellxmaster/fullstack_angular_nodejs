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
    const startDate = this.resolveDate(period);
    const finalEndDate = endDate ? this.resolveDate(endDate) : startDate;

    const query = {
      period: startDate.toDateString(),
      endDate: finalEndDate.toDateString(),
    };
    // Find if a register exists for the current date and location
    const cachedData = await this.weatherSummaryModel.findOne(query);

    // Return cached data if it exists and check the period of caching
    if (cachedData && this.isDataValid(cachedData.date, 24)) {
      return cachedData;
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
      const filteredData = this.filterData(
        response.data,
        startDate.toDateString(),
        finalEndDate.toDateString(),
      );
      const newRecord = new this.weatherSummaryModel(filteredData);
      await newRecord.save();
      return filteredData;
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      return error.response.data;
    }
  }

  /**
   * Resolves a date string to a Date object.
   * @param dateStr - The date string to resolve.
   * @returns The resolved Date object.
   */
  private resolveDate(dateStr: string): Date {
    console.log(dateStr);
    if (dateStr === 'today') {
      return new Date();
    } else if (dateStr === 'tomorrow') {
      let date = new Date();
      date.setDate(date.getDate() + 1);
      return date;
    } else if (dateStr === 'yesterday') {
      let date = new Date();
      date.setDate(date.getDate() - 1);
      return date;
    } else {
      return new Date(dateStr);
    }
  }

  /**
   * Checks if the cached data is still valid based on the specified time period.
   * @param cachedDate - The date when the data was cached.
   * @param hoursValid - The number of hours the data is considered valid.
   * @returns True if the data is still valid, false otherwise.
   */
  private isDataValid(cachedDate: Date, hoursValid: number): boolean {
    const currentTime = new Date();
    const timeDifference = Math.abs(
      currentTime.getTime() - cachedDate.getTime(),
    );
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    return hoursDifference <= hoursValid;
  }

  /**
   * Filters the retrieved weather data to extract relevant information.
   * @param data - The raw weather data to filter.
   * @returns The filtered weather data.
   */
  private filterData(data: any, period: string, endDate: string): any {
    return {
      date: new Date().toDateString(),
      period: period,
      endDate: endDate,
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
