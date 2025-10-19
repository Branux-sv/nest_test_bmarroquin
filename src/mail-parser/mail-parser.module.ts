import { Module } from '@nestjs/common';
import { MailParserController } from './mail-parser.controller';
import { MailParserService } from './mail-parser.service';
import { HttpModule } from '@nestjs/axios';
import { LocalFileEmailSource } from './providers/sources/local-file-email.source';
import { ExternalWebResourceEmailSource } from './providers/sources/external-web-resource-email.source';
import { EmailSourceFactory } from './providers/email-source.factory';

@Module({
  imports: [HttpModule],
  controllers: [MailParserController],
  providers: [
    MailParserService,
    LocalFileEmailSource,
    ExternalWebResourceEmailSource,
    {
      provide: 'IEmailSourceFactory',
      useClass: EmailSourceFactory,
    },
  ],
})
export class MailParserModule {}
