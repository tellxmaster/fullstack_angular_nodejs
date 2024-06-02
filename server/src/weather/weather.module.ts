import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherSummarySchema } from './schemas/weather-summary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'WeatherSummary', schema: WeatherSummarySchema },
    ]),
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
