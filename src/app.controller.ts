import { Controller, Get, HttpException, HttpStatus, Logger, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream, existsSync, statSync, writeFile } from 'fs';
import { join } from 'path';
import { bindNodeCallback, catchError, mapTo, tap } from 'rxjs';

@Controller()
export class AppController {

  private readonly logger = new Logger(AppController.name)
  constructor(
  ) {


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
  async getfile(@Res() res: Response, @Param() param: { folder: string, fileName: string }) {
    const filePath = join(process.cwd(), 'assets', param.folder, param.fileName);

    if (existsSync(filePath)) {
      const stat = statSync(filePath);

      /** update database */
      // await this.service.createData({
      //   id: 0,
      //   user_id: "1",
      //   user_name: "test",
      //   dept_id: "1",
      //   dept_name: "test",
      //   role_id: "1",
      //   role_name: "test",
      //   search_keyword: "test",
      //   search_date: new Date(),
      //   short_statement: "test",
      //   item_id: "1",
      //   item_name: param.fileName,
      //   item_upload_date: new Date(),
      //   item_category: param.folder,
      //   item_overview: ''
      // })

      const file = createReadStream(filePath)

      var mime = require('mime');


      res.set({
        'Content-Disposition': `attachment; filename="${param.fileName}"`,
        'Content-Length': stat.size,
        "Access-Control-Allow-Headers": "X-Requested-With",
        'content-type': mime.getType(filePath)
      });

      file.pipe(res);
      this.logger.log(`Download File : ${filePath} Success`);
    } else {
      res.setHeader("Content-Type", 'text/plain');
      res.statusCode = HttpStatus.NOT_FOUND
      res.write("FILE NOT FOUND");
      res.end();
      this.logger.log(`File Not Found`);
    }


  }


}
