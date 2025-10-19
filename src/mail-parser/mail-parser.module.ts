import { Module } from '@nestjs/common';
import { MailParserController } from './mail-parser.controller';
import { MailParserService } from './mail-parser.service';
import { HttpModule } from '@nestjs/axios';
import { LocalFileEmailSource } from './providers/sources/local-file-email.source';
import { ExternalWebResourceEmailSource } from './providers/sources/external-web-resource-email.source';
import { EmailSourceFactory } from './providers/email-source.factory';
import { AttachmentJsonSource } from './providers/json-sources/attachment-json.source';
import { DirectLinkJsonSource } from './providers/json-sources/direct-link-json.source';
import { WebPageWithLinkJsonSource } from './providers/json-sources/web-page-link-json.source';
import { JsonSourceFactory } from './providers/json-source.factory';

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
    AttachmentJsonSource,
    DirectLinkJsonSource,
    WebPageWithLinkJsonSource,
    {
      provide: 'IJsonSourceFactory',
      useClass: JsonSourceFactory,
    },
  ],
})
export class MailParserModule {}
