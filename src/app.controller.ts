import { Controller, Get, HttpException, HttpStatus, Logger, Param, Post, Req, Request, Res, StreamableFile, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { createReadStream, readFile, statSync, writeFile } from 'fs';
import { formatWithCursor } from 'prettier';
import { diskStorage } from 'multer';
import { bindNodeCallback, catchError, EMPTY, mapTo, of, tap } from 'rxjs';
import * as path from 'path';
import { join } from 'path';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TransactionRepository } from 'typeorm';
import { SearchLogService } from './search-log/search-log.service';
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name)
  constructor(private service: SearchLogService) {
    // this.searchRepository.fin

  }

  @Post('upload/:folder')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Param('folder') folder) {

    if (!file) {
      this.logger.error('Not Found!!!!', HttpStatus.BAD_REQUEST);
      throw new HttpException('Not Found!!!!', HttpStatus.BAD_REQUEST)
    }
    const writFileAsObservable = bindNodeCallback(writeFile);
    return writFileAsObservable(`assets/${folder}/${file.originalname}`, file.buffer).pipe(mapTo({ success: true }), tap(res => {

      this.logger.log(`upload file assets/${folder}/${file.originalname} complete`)
    }), catchError(err => {
      this.logger.error(err)
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }))
  }

  @Get('download/:folder/:fileName')
  getfile(@Res() res: Response, @Param() param: { folder: string, fileName: string }) {
    this.service.createUser({
      id: 0,
      user_id: "1",
      user_name: "test",
      dept_id: "1",
      dept_name: "test",
      role_id: "1",
      role_name: "test",
      search_keyword: "test",
      search_date: new Date(),
      short_statement: "test",
      item_id: "1",
      item_name: param.fileName,
      item_upload_date: new Date(),
      item_category: param.folder,
      item_overview: ''
    })
    const filePath = join(process.cwd(), 'assets', param.folder, param.fileName);
    const file = createReadStream(filePath)
    const stat = statSync(filePath);
    res.set({
      'Content-Disposition': `attachment; filename="${param.fileName}"`,
      'Content-Length': stat.size
    });

    file.pipe(res)
    // this.service.update()
  }

  @Get()
  getAll() {

    return this.service.getDataById(3)
  }
}
