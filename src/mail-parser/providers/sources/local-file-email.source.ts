import { Injectable } from '@nestjs/common';
import { IEmailSource } from '../../../mail-parser/interfaces/email-source.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LocalFileEmailSource implements IEmailSource {
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
      throw new Error(`Failed to read email file: ${error}`);
    }
  }
}
