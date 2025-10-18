import { Mail, Receipt } from '../mapper.entity';

export const PASS_VALUE = 'PASS';
export const MAX_PROCESSING_TIME = 1000;
const regExpPatternBeforeAtSymbol = /^([^@]+)@/;

export const getDNSValue = (receipt: Receipt): boolean => {
  const { spfVerdict, dkimVerdict, dmarcVerdict } = receipt;
  if (
    spfVerdict.status === PASS_VALUE &&
    dkimVerdict.status === PASS_VALUE &&
    dmarcVerdict.status === PASS_VALUE
  ) {
    return true;
  }
  return false;
};

export const getMonthName = (maiObj: Mail): string => {
  let monthName = '';
  const { timestamp } = maiObj;

  const dateObject = new Date(timestamp);

  if (isNaN(dateObject.getTime())) {
    monthName = 'Not a valid date';
  }

  monthName = dateObject.toLocaleString('default', { month: 'long' });
  return monthName;
};

export const getUsernameWithoutDomain = (sourceEmail: string): string => {
  let username = 'NotFound';
  const match = sourceEmail.match(regExpPatternBeforeAtSymbol);
  if (match) {
    username = match[1];
  }
  return username;
};

export const getListUsernamesWithoutDomain = (maiObj: Mail): string[] => {
  const { destination } = maiObj;
  const listUserNames = destination?.map((email: string) =>
    getUsernameWithoutDomain(email),
  );
  return listUserNames;
};
