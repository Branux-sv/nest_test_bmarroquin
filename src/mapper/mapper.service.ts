import { Injectable } from '@nestjs/common';
import { MapperResponseDto } from './dto/mapper-response.dto';
import { SesSnsEvent } from './mapper.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MapperService {
  getResponseMapping(sesSnsEvent: SesSnsEvent): MapperResponseDto[] {
    //Code is prepare to process an array of objects inside the Records array property
    const mappedResponse = sesSnsEvent.Records.map((record) => {
      return plainToInstance(MapperResponseDto, record, {
        excludeExtraneousValues: true,
      }) as MapperResponseDto;
    });

    return mappedResponse;
  }
}
