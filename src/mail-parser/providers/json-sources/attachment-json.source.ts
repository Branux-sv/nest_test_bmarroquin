import { Injectable } from '@nestjs/common';
import { IJsonSource } from '../../interfaces/json-source.interface';
import { JsonAttachment } from '../../types/mail-parser.type';
import { Attachment, ParsedMail } from 'mailparser';

@Injectable()
export class AttachmentJsonSource implements IJsonSource {
  getJson(parsedEmail: ParsedMail): JsonAttachment | null {
    const jsonAttachment = this.findJsonAttachment(parsedEmail);

    if (!jsonAttachment) {
      return null;
    }

    try {
      const content = jsonAttachment.content.toString('utf-8');
      const data = JSON.parse(content) as JsonAttachment;
      return data;
    } catch (error) {
      console.error('Failed to parse attachment JSON:', error);
      return null;
    }
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
}
