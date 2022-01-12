import { Controller, Get, HttpException, HttpStatus, Logger, Param, Post, Req, Request, Res, StreamableFile, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { createReadStream, readFile, writeFile } from 'fs';
import { formatWithCursor } from 'prettier';
import { diskStorage } from 'multer';
import { bindNodeCallback, catchError, EMPTY, mapTo, of, tap } from 'rxjs';
import * as path from 'path';
import { join } from 'path';
import { Response } from 'express';
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name)
  constructor(private readonly appService: AppService) { }

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
  getfile(@Res() res: Response, @Param() param) {
    const fileName = join(process.cwd(), 'assets', param.folder, param.fileName);
    this.logger.log(`Download file 'assets'/${param.folder}/${param.fileName} complete`)
    res.set({
      'Content-Disposition': `attachment; filename="${param.fileName}"`,
    });
    return res.sendFile(fileName);
  }
}
