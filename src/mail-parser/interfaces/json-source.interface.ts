import { ParsedMail } from 'mailparser';
import { JsonAttachment } from '../types/mail-parser.type';

export interface IJsonSource {
  getJson(
    parsedEmail: ParsedMail,
  ): Promise<JsonAttachment | null> | JsonAttachment | null;
}
