import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class WeatherSummary extends Document {
  @Prop({ type: Date, required: true })
  date: Date;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop()
  resolvedAddress: string;

  @Prop()
  address: string;

  @Prop()
  timezone: string;

  @Prop()
  tzoffset: number;

  @Prop()
  description: string;

  @Prop({ type: Object })
  currentConditions: CurrentConditions;

  @Prop({ type: [Object] })
  dailySummaries: Types.Array<DailySummary>;
}

export const WeatherSummarySchema =
  SchemaFactory.createForClass(WeatherSummary);
