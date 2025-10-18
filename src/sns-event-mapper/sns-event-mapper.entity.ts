import { Type } from 'class-transformer';

export class CommonHeaders {
  returnPath: string;
  from: string[];
  date: string;
  to: string[];
  cc: string[];
  messageId: string;
  subject: string;
}

export class Header {
  name: string;
  value: string;
}

export class Action {
  type: string;
  topicArn: string;
}

export class Verdict {
  status: string;
}

export class Receipt {
  timestamp: string;
  processingTimeMillis: number;
  recipients: string[];
  @Type(() => Verdict)
  spamVerdict: Verdict;
  @Type(() => Verdict)
  virusVerdict: Verdict;
  @Type(() => Verdict)
  spfVerdict: Verdict;
  @Type(() => Verdict)
  dkimVerdict: Verdict;
  @Type(() => Verdict)
  dmarcVerdict: Verdict;
  dmarcPolicy: string;
  action: Action;
}
export class Mail {
  timestamp: string;
  source: string;
  messageId: string;
  destination: string[];
  headersTruncated: boolean;
  headers: Header[];
  commonHeaders: CommonHeaders;
}

export class Ses {
  @Type(() => Receipt)
  receipt: Receipt;
  mail: Mail;
}
export class SesSnsRecord {
  eventVersion: string;
  @Type(() => Ses)
  ses: Ses;
  eventSource: string;
}
export class SesSnsEvent {
  @Type(() => SesSnsRecord)
  Records: SesSnsRecord[];
}
