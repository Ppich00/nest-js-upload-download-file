import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchLogModule } from './search-log/search-log.module';
import { SearchLogService } from './search-log/search-log.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database_sql',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SearchLogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {
    // console.log(this.connection.isConnected);

  }
}
