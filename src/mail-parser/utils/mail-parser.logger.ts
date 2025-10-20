import { Logger } from '@nestjs/common';

export class AppLogger {
  private readonly logger = new Logger(AppLogger.name);

  getLogger(): Logger {
    return this.logger;
  }
}
