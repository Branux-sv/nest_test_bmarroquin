import { Injectable } from '@nestjs/common';
import { JsonSourceType } from '../enums/mail-parser-source.enum';
import { IJsonSource } from '../interfaces/json-source.interface';
import { AttachmentJsonSource } from './json-sources/attachment-json.source';
import { DirectLinkJsonSource } from './json-sources/direct-link-json.source';
import { WebPageWithLinkJsonSource } from './json-sources/web-page-link-json.source';

export interface IJsonSourceFactory {
  getJsonSource(sourceType: JsonSourceType): IJsonSource;
}

@Injectable()
export class JsonSourceFactory implements IJsonSourceFactory {
  constructor(
    private readonly attachmentSource: AttachmentJsonSource,
    private readonly directLinkSource: DirectLinkJsonSource,
    private readonly webPageWithLinkSource: WebPageWithLinkJsonSource,
  ) {}

  getJsonSource(sourceType: JsonSourceType): IJsonSource {
    switch (sourceType) {
      case JsonSourceType.Attachment:
        return this.attachmentSource;
      case JsonSourceType.DirectLink:
        return this.directLinkSource;
      case JsonSourceType.WebPageWithJsonLink:
        return this.webPageWithLinkSource;
      default:
        throw new Error('Invalid json source type');
    }
  }
}
