import { Expose, Transform } from 'class-transformer';
import {
  getDNSValue,
  getListUsernamesWithoutDomain,
  getMonthName,
  getUsernameWithoutDomain,
  MAX_PROCESSING_TIME,
  PASS_VALUE,
} from '../utils/mapperHelper';
import { SesSnsRecord } from '../mapper.entity';

export class MapperResponseDto {
  @Expose()
  @Transform(({ obj }) =>
    (obj as SesSnsRecord)?.ses?.receipt?.spamVerdict?.status === PASS_VALUE
      ? true
      : false,
  )
  spam: boolean;

  @Expose()
  @Transform(({ obj }) =>
    (obj as SesSnsRecord)?.ses?.receipt?.virusVerdict?.status === PASS_VALUE
      ? true
      : false,
  )
  virus: boolean;

  @Expose()
  @Transform(({ obj }) => getDNSValue((obj as SesSnsRecord)?.ses?.receipt))
  dns: boolean;

  @Expose()
  @Transform(({ obj }) => getMonthName((obj as SesSnsRecord)?.ses?.mail))
  mes: string;

  @Expose()
  @Transform(({ obj }) =>
    (obj as SesSnsRecord)?.ses?.receipt?.processingTimeMillis >
    MAX_PROCESSING_TIME
      ? true
      : false,
  )
  retrasado: boolean;

  @Expose()
  @Transform(({ obj }) =>
    getUsernameWithoutDomain((obj as SesSnsRecord)?.ses?.mail?.source),
  )
  emisor: string;

  @Expose()
  @Transform(({ obj }) =>
    getListUsernamesWithoutDomain((obj as SesSnsRecord)?.ses?.mail),
  )
  receptor: string[];
}
