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

    //Try to find JSON as attachment
    const attachmentResult = this.getJsonFromAttachment(parsedEmail);
    if (attachmentResult) {
      return { jsonData: attachmentResult };
    }

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

  private findJsonAttachment(parsedEmail: ParsedMail): Attachment | undefined {
    if (!parsedEmail.attachments || parsedEmail.attachments.length === 0) {
      return undefined;
    }

    return parsedEmail.attachments.find((attachment) => {
      const isJsonFile = attachment.filename?.toLowerCase().endsWith('.json');
      const isJsonContentType =
        attachment.contentType?.includes('application/json');

      return isJsonFile || isJsonContentType;
    });
  }

  private getJsonFromAttachment(
    parsedEmail: ParsedMail,
  ): Record<string, unknown> | null {
    const jsonAttachment = this.findJsonAttachment(parsedEmail);

    if (!jsonAttachment) {
      return null;
    }

    try {
      const content = jsonAttachment.content.toString('utf-8');
      const data = JSON.parse(content) as Record<string, unknown>;
      return data;
    } catch (error) {
      console.error('Failed to parse attachment JSON:', error);
      return null;
    }
  }
}
