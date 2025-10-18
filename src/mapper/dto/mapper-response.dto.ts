/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Expose, Transform } from 'class-transformer';
import {
  getDNSValue,
  getListUsernamesWithoutDomain,
  getMonthName,
  getUsernameWithoutDomain,
  MAX_PROCESSING_TIME,
  PASS_VALUE,
} from '../utils/mapperHelper';
import { Mail, Receipt } from '../mapper.entity';

export class MapperResponseDto {
  @Expose()
  @Transform(({ obj }) =>
    obj?.ses?.receipt?.spamVerdict?.status === PASS_VALUE ? true : false,
  )
  spam: boolean;

  @Expose()
  @Transform(({ obj }) =>
    obj?.ses?.receipt?.spamVerdict?.status === PASS_VALUE ? true : false,
  )
  virus: boolean;

  @Expose()
  @Transform(({ obj }) => getDNSValue(obj?.ses?.receipt as Receipt))
  dns: boolean;

  @Expose()
  @Transform(({ obj }) => getMonthName(obj?.ses?.mail as Mail))
  mes: string;

  @Expose()
  @Transform(({ obj }) =>
    obj?.ses?.receipt?.processingTimeMillis > MAX_PROCESSING_TIME
      ? true
      : false,
  )
  retrasado: boolean;

  @Expose()
  @Transform(({ obj }) =>
    getUsernameWithoutDomain(obj?.ses?.mail?.source as string),
  )
  emisor: string;

  @Expose()
  @Transform(({ obj }) => getListUsernamesWithoutDomain(obj?.ses?.mail as Mail))
  receptor: string[];
}
