import {
  Body,
  Controller,
  FileValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileRequestDto } from '../model/file.dto';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 20000000 })],
      }),
    )
    file: Express.Multer.File,
    @Req() request: any,
  ) {
    return this.fileService.uploadFile(
      request.userId,
      file.originalname,
      file.buffer,
    );
  }

  @Get()
  getSignedURL() {}
}
