import { Module } from '@nestjs/common';
import { SNSEventMapperController } from './sns-event-mapper.controller';
import { SNSEventMapperService } from './sns-event-mapper.service';

@Module({
  imports: [],
  controllers: [SNSEventMapperController],
  providers: [SNSEventMapperService],
})
export class SNSEventMapperModule {}
