import { Module } from '@nestjs/common';
import { SNSEventMapperModule } from './sns-event-mapper/sns-event-mapper.module';
@Module({
  imports: [SNSEventMapperModule],
})
export class AppModule {}
