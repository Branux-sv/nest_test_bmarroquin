import { Module } from '@nestjs/common';
import { SNSEventMapperModule } from './sns-event-mapper/sns-event-mapper.module';
import { MailParserModule } from './mail-parser/mail-parser.module';
@Module({
  imports: [SNSEventMapperModule, MailParserModule],
})
export class AppModule {}
