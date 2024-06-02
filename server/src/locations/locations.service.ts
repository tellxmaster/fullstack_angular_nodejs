import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from './schemas/location.schema';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
  ) {}

  async findAll(): Promise<Location[]> {
    return this.locationModel.find().exec();
  }

  async create(location: Location): Promise<Location> {
    const newCity = new this.locationModel(location);
    return newCity.save();
  }
}
