import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchLogModule } from './search-log/search-log.module';
import { SearchLogService } from './search-log/search-log.service';

@Module({
  imports: [
    /** connect database */
    // // TypeOrmModule.forRoot({
    // //   type: 'mysql',
    // //   host: 'localhost',
    // //   port: 3306,
    // //   username: 'root',
    // //   password: '12345678',
    // //   database: 'test',
    // //   autoLoadEntities: true,
    // //   synchronize: false, /** ถ้า true จะ syn กับ database จะสร้าง table ตาม entity */
    // // }),
    // SearchLogModule
    /** connect database */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private connection: Connection) {
  //   // console.log(this.connection.isConnected);

  // }
}
