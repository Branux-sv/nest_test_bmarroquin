import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { MailParserResponseDto } from './dto/mail-parser-response.dto';
import { SourceDownloadEmail } from './enums/mail-parser-source.enum';
import type { IEmailSourceFactory } from './providers/email-source.factory';
import { IEmailSource } from './interfaces/email-source.interface';
import { simpleParser, ParsedMail, Attachment } from 'mailparser';

@Injectable()
export class MailParserService {
  constructor(
    @Inject('IEmailSourceFactory')
    private readonly factoryEmailSource: IEmailSourceFactory,
    private readonly httpService: HttpService,
  ) {}

  async getJsonFileFromEmail(
    emailPathOrUrl: string,
  ): Promise<MailParserResponseDto> {
    const sourceType = this.getSourceTypeWhereGetEmail(emailPathOrUrl);
    const sourceGetEmail: IEmailSource =
      this.factoryEmailSource.getEmailSource(sourceType);
    const emailContent = await sourceGetEmail.getEmailContent(emailPathOrUrl);
    const parsedEmail = await simpleParser(emailContent);

    return { jsonData: { name: '123' } };
  }

  private getSourceTypeWhereGetEmail(
    emailPathOrUrl: string,
  ): SourceDownloadEmail {
    let sourceDownloadEmail = SourceDownloadEmail.LocalFile;
    if (
      emailPathOrUrl.startsWith('http://') ||
      emailPathOrUrl.startsWith('https://')
    ) {
      sourceDownloadEmail = SourceDownloadEmail.ExternalWebResource;
    }
    return sourceDownloadEmail;
  }


}
