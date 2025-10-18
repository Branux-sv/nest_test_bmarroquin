import { Body, Controller, Post } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { MapperResponseDto } from './dto/mapper-response.dto';
import { SesSnsEvent } from './mapper.entity';

@Controller('/project1/mapper')
export class MapperController {
  constructor(private readonly mapperService: MapperService) {}

  @Post()
  getMappedResponse(@Body() sesSnsEvent: SesSnsEvent): MapperResponseDto[] {
    return this.mapperService.getResponseMapping(sesSnsEvent);
  }
}
