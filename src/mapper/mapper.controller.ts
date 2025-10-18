import { Body, Controller, Get, Post } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { MapperResponseDto } from './dto/mapper-response.dto';
import { SesSnsEvent } from './mapper.entity';

@Controller('/project1/mapper')
export class MapperController {
  constructor(private readonly mapperService: MapperService) {}

  @Get()
  getHello(): string {
    return "Hey there, I'm using nestjs!";
  }

  @Post()
  getMappedResponse(@Body() sesSnsEvent: SesSnsEvent): MapperResponseDto[] {
    //TODO: remove this console.log
    console.log(typeof sesSnsEvent.Records[0].ses.mail.timestamp);
    return this.mapperService.getResponseMapping(sesSnsEvent);
  }
}
