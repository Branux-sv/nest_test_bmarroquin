import { Injectable } from '@nestjs/common';
import { IEmailSource } from '../../../mail-parser/interfaces/email-source.interface';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { DEFAULT_TIME_OUT_HTTP } from '../../../mail-parser/consts/mail-parser-source.const';

@Injectable()
export class ExternalWebResourceEmailSource implements IEmailSource {
  constructor(private readonly httpService: HttpService) {}

  async getEmailContent(url: string): Promise<Buffer> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          responseType: 'arraybuffer',
          timeout: DEFAULT_TIME_OUT_HTTP,
        }),
      );
      return Buffer.from(response.data);
    } catch (error) {
      throw new Error(`Failed to download email from URL: ${error}`);
    }
  }
}
