export interface IEmailSource {
  getEmailContent(sourceIdentifier: string): Promise<Buffer>;
}
