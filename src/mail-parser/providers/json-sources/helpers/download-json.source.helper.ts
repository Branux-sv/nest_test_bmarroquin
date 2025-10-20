import { lastValueFrom } from 'rxjs';
import { DEFAULT_TIME_OUT_HTTP } from '../../../../mail-parser/consts/mail-parser-source.const';
import { JsonAttachment } from '../../../../mail-parser/types/mail-parser.type';
import { HttpService } from '@nestjs/axios';

/**
 * Downloads a JSON from an URL
 */
export const getJsonFromDirectLink = async (
  httpService: HttpService,
  url: string,
): Promise<JsonAttachment | null> => {
  try {
    const response = await lastValueFrom(
      httpService.get(url, {
        timeout: DEFAULT_TIME_OUT_HTTP,
        headers: {
          Accept: 'application/json, text/plain, */*',
        },
        validateStatus: (status) => status === 200,
      }),
    );

    // Try to parse as JSON
    let data: JsonAttachment;
    if (typeof response.data === 'string') {
      data = JSON.parse(response.data) as JsonAttachment;
    } else if (typeof response.data === 'object') {
      data = response.data as JsonAttachment;
    } else {
      return null;
    }

    return data;
  } catch (error) {
    console.warn(`Not a direct JSON link or failed to fetch`, error);
    return null;
  }
};
