//Leaving the open doors for future sources, like AWS S3, Kafka, DB, etc
export enum SourceDownloadEmail {
  LocalFile = 'LocalFile',
  ExternalWebResource = 'ExternalWebResource',
}

export enum JsonSourceType {
  Attachment = 'attachment',
  DirectLink = 'directLink',
  WebPageWithJsonLink = 'webPageWithJsonLink',
}
