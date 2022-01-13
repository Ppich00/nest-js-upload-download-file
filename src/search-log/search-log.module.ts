import { Module } from '@nestjs/common';
import { SearchLogService } from './search-log.service';
import { SearchLogController } from './search-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchLogEntity } from './search-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SearchLogEntity])],
  providers: [SearchLogService],
  controllers: [SearchLogController],
  exports:[SearchLogService]
})
export class SearchLogModule { }
