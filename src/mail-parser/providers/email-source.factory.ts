import { Injectable } from '@nestjs/common';
import { SourceDownloadEmail } from '../enums/mail-parser-source.enum';
import { IEmailSource } from '../interfaces/email-source.interface';
import { ExternalWebResourceEmailSource } from './sources/external-web-resource-email.source';
import { LocalFileEmailSource } from './sources/local-file-email.source';

//Interface for the factory to enable DI
export interface IEmailSourceFactory {
  getEmailSource(sourceType: SourceDownloadEmail): IEmailSource;
}

@Injectable()
export class EmailSourceFactory implements IEmailSourceFactory {
  constructor(
    private readonly localFileSource: LocalFileEmailSource,
    private readonly externalWebSource: ExternalWebResourceEmailSource,
  ) {}

  getEmailSource(sourceType: SourceDownloadEmail): IEmailSource {
    switch (sourceType) {
      case SourceDownloadEmail.LocalFile:
        return this.localFileSource;
      case SourceDownloadEmail.ExternalWebResource:
        return this.externalWebSource;
      default:
        throw new Error('Invalid source type');
    }
  }
}
