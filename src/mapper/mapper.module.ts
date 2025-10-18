import { Module } from '@nestjs/common';
import { MapperController } from './mapper.controller';
import { MapperService } from './mapper.service';

@Module({
  imports: [],
  controllers: [MapperController],
  providers: [MapperService],
})
export class MapperModule {}
