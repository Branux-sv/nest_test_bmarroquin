import { Injectable } from '@nestjs/common';
import { IJsonSource } from '../../interfaces/json-source.interface';
import { JsonAttachment } from '../../types/mail-parser.type';
import { ParsedMail } from 'mailparser';
import { extractLinksFromEmail } from './helpers/base-link-json.source.helper';
import { HttpService } from '@nestjs/axios';
import { getJsonFromDirectLink } from './helpers/download-json.source.helper';

@Injectable()
export class DirectLinkJsonSource implements IJsonSource {
  constructor(private readonly httpService: HttpService) {}

  async getJson(parsedEmail: ParsedMail): Promise<JsonAttachment | null> {
    const links = extractLinksFromEmail(parsedEmail);
    let jsonAttachment: JsonAttachment | null = null;

    //Try each link to see if it's a direct JSON
    for (const link of links) {
      const directJsonResult = await getJsonFromDirectLink(
        this.httpService,
        link,
      );
      //If we found one, will exit the for loop
      if (directJsonResult) {
        jsonAttachment = directJsonResult;
        break;
      }
    }

    return jsonAttachment;
  }
}
