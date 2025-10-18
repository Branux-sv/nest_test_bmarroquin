import { Injectable } from '@nestjs/common';
import { SNSEventMapperResponseDto } from './dto/sns-event-mapper-response.dto';
import { SesSnsEvent } from './sns-event-mapper.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SNSEventMapperService {
  getSnsEventMappedResponse(
    sesSnsEvent: SesSnsEvent,
  ): SNSEventMapperResponseDto[] {
    //Code is prepare to process an array of objects inside the Records array property
    const snsEventMappedResponse = sesSnsEvent.Records.map((record) => {
      return plainToInstance(SNSEventMapperResponseDto, record, {
        excludeExtraneousValues: true,
      });
    });

    return snsEventMappedResponse;
  }
}
