import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Location {
  @Prop()
  name: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
