import { Injectable } from '@nestjs/common';
import { IEmailSource } from '../../../mail-parser/interfaces/email-source.interface';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ExternalWebResourceEmailSource implements IEmailSource {
  constructor(private readonly httpService: HttpService) {}

  async getEmailContent(url: string): Promise<Buffer> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          responseType: 'arraybuffer',
          timeout: 30000,
        }),
      );
      return Buffer.from(response.data);
    } catch (error) {
      throw new Error(`Failed to download email from URL: ${error}`);
    }
  }
}
