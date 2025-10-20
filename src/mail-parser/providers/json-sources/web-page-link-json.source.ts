import { Injectable } from '@nestjs/common';
import { IJsonSource } from '../../interfaces/json-source.interface';
import { JsonAttachment } from '../../types/mail-parser.type';
import { ParsedMail } from 'mailparser';
import {
  extractLinksFromEmail,
  findJsonLinksInHtml,
} from './helpers/base-link-json.source.helper';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { DEFAULT_TIME_OUT_HTTP } from '../../../mail-parser/consts/mail-parser-source.const';
import { getJsonFromDirectLink } from './helpers/download-json.source.helper';
import { AppLogger } from '../../../mail-parser/utils/mail-parser.logger';

@Injectable()
export class WebPageWithLinkJsonSource implements IJsonSource {
  constructor(
    private readonly httpService: HttpService,
    private readonly appLogger: AppLogger,
  ) {}

  async getJson(parsedEmail: ParsedMail): Promise<JsonAttachment | null> {
    const links = extractLinksFromEmail(parsedEmail);
    let jsonAttachment: JsonAttachment | null = null;

    //Try if it's a webpage with a JSON link
    for (const link of links) {
      const webPageJsonResult = await this.getJsonFromWebpageWithJsonLink(link);
      //If we found one, will exit the for loop
      if (webPageJsonResult) {
        jsonAttachment = webPageJsonResult;
        break;
      }
    }

    return jsonAttachment;
  }

  private async getJsonFromWebpageWithJsonLink(
    pageUrl: string,
  ): Promise<JsonAttachment | null> {
    try {
      //Fetch the webpage
      const response = await lastValueFrom(
        this.httpService.get(pageUrl, {
          timeout: DEFAULT_TIME_OUT_HTTP,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; EmailParser/1.0)',
          },
        }),
      );

      const contentType = (response.headers['content-type'] as string) || '';
      //Only process HTML pages
      if (!contentType.includes('text/html')) {
        return null;
      }

      //Find JSON links
      const jsonLinks = findJsonLinksInHtml(response.data, pageUrl);

      if (jsonLinks.length === 0) {
        return null;
      }

      //Try each found JSON link from the web page
      for (const jsonUrl of jsonLinks) {
        const directJsonResult = await getJsonFromDirectLink(
          this.httpService,
          jsonUrl,
        );
        if (directJsonResult) return directJsonResult;
      }

      return null;
    } catch (error) {
      this.appLogger.getLogger().warn('Failed to process webpage:', error);
      return null;
    }
  }
}
