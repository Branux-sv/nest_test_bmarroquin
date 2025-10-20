import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IEmailSource } from '../../../mail-parser/interfaces/email-source.interface';
import * as fs from 'fs';
import * as path from 'path';
import { AppLogger } from './../../../mail-parser/utils/mail-parser.logger';

@Injectable()
export class LocalFileEmailSource implements IEmailSource {
  constructor(private readonly appLogger: AppLogger) {}

  async getEmailContent(filePath: string): Promise<Buffer> {
    try {
      const absolutePath = path.isAbsolute(filePath)
        ? filePath
        : path.resolve(process.cwd(), filePath);

      if (!fs.existsSync(absolutePath)) {
        throw new Error(`File not found: ${absolutePath}`);
      }

      return fs.promises.readFile(absolutePath);
    } catch (error) {
      this.appLogger.getLogger().error('[getEmailContent] -> Error', error);
      throw new InternalServerErrorException(`Failed to read email file`);
    }
  }
}
