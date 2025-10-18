import { Body, Controller, Post } from '@nestjs/common';
import { SNSEventMapperService } from './sns-event-mapper.service';
import { SNSEventMapperResponseDto } from './dto/sns-event-mapper-response.dto';
import { SesSnsEvent } from './sns-event-mapper.entity';

@Controller('/project1/mapper')
export class SNSEventMapperController {
  constructor(private readonly snsEventMapperService: SNSEventMapperService) {}

  @Post()
  getSnsEventMappedResponse(
    @Body() sesSnsEvent: SesSnsEvent,
  ): SNSEventMapperResponseDto[] {
    return this.snsEventMapperService.getSnsEventMappedResponse(sesSnsEvent);
  }
}
