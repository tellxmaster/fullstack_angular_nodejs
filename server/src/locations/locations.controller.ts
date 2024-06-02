import { Controller, Get } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from './schemas/location.schema';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  async findAll(): Promise<Location[]> {
    return this.locationsService.findAll();
  }
}
