import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { MailParserService } from './mail-parser.service';
import { MailParserResponseDto } from './dto/mail-parser-response.dto';

@Controller('/project2/mail-parser')
export class MailParserController {
  constructor(private readonly mailParserService: MailParserService) {}

  @Get()
  async getJsonFileFromEmail(
    @Query('emailPath') emailPathOrUrl: string,
  ): Promise<MailParserResponseDto> {
    if (!emailPathOrUrl) {
      throw new BadRequestException(
        'The path or the URL of the email is required',
      );
    }
    return this.mailParserService.getJsonFileFromEmail(emailPathOrUrl);
  }
}
