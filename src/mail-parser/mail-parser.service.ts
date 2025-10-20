import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { MailParserResponseDto } from './dto/mail-parser-response.dto';
import {
  JsonSourceType,
  SourceDownloadEmail,
} from './enums/mail-parser-source.enum';
import type { IEmailSourceFactory } from './providers/email-source.factory';
import { IEmailSource } from './interfaces/email-source.interface';
import { simpleParser } from 'mailparser';
import { JsonAttachment } from './types/mail-parser.type';
import type { IJsonSourceFactory } from './providers/json-source.factory';
import { IJsonSource } from './interfaces/json-source.interface';

@Injectable()
export class MailParserService {
  constructor(
    @Inject('IEmailSourceFactory')
    private readonly factoryEmailSource: IEmailSourceFactory,
    private readonly httpService: HttpService,
    @Inject('IJsonSourceFactory')
    private readonly factoryJsonSource: IJsonSourceFactory,
  ) {}

  async getJsonFileFromEmail(
    emailPathOrUrl: string,
  ): Promise<MailParserResponseDto> {
    let jsonAttachment: JsonAttachment | null = null;
    const sourceType = this.getSourceTypeWhereGetEmail(emailPathOrUrl);
    const sourceGetEmail: IEmailSource =
      this.factoryEmailSource.getEmailSource(sourceType);
    const emailContent = await sourceGetEmail.getEmailContent(emailPathOrUrl);
    const parsedEmail = await simpleParser(emailContent);

    //Iterate over all type of json sources in the order those are defined
    for (const jsonSource of Object.values(JsonSourceType)) {
      const sourceToGetJson: IJsonSource =
        this.factoryJsonSource.getJsonSource(jsonSource);
      jsonAttachment = await sourceToGetJson.getJson(parsedEmail);

      if (jsonAttachment) {
        break;
      }
    }

    if (!jsonAttachment) {
      throw new BadRequestException(
        'Could not extract JSON from any source in the email',
      );
    }

    return { jsonData: jsonAttachment };
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
