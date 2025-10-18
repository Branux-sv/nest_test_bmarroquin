export class SesSnsEvent {
  records: SesSnsRecord[];
}

export class SesSnsRecord {
  eventVersion: string;
  ses: Ses;
  eventSource: string;
}

export class Ses {
  receipt: Receipt;
  mail: Mail;
}

export class Mail {
  timestamp: Date;
  source: string;
  messageId: string;
  destination: string[];
  headersTruncated: boolean;
  headers: Header[];
  commonHeaders: CommonHeaders;
}

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

export class Receipt {
  timestamp: Date;
  processingTimeMillis: number;
  recipients: string[];
  spamVerdict: Verdict;
  virusVerdict: Verdict;
  spfVerdict: Verdict;
  dkimVerdict: Verdict;
  dmarcVerdict: Verdict;
  dmarcPolicy: string;
  action: Action;
}

export class Action {
  type: string;
  topicArn: string;
}

export class Verdict {
  status: string;
}
