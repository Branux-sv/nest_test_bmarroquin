import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { MailParserService } from './mail-parser.service';
import { MailParserResponseDto } from './dto/mail-parser-response.dto';
import { JsonAttachment } from './types/mail-parser.type';

@Controller('/mail-parser')
export class MailParserController {
  constructor(private readonly mailParserService: MailParserService) {}

  @Get()
  async getJsonFileFromEmail(
    @Query('emailPath') emailPathOrUrl: string,
  ): Promise<JsonAttachment> {
    if (!emailPathOrUrl) {
      throw new BadRequestException(
        'The path or the URL of the email is required',
      );
    }
    const response: MailParserResponseDto =
      await this.mailParserService.getJsonFileFromEmail(emailPathOrUrl);

    return response.jsonData;
  }
}
