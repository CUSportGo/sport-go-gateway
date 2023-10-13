import {
  Body,
  Controller,
  Get,
  Post,
  Put,
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
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadFileRequestDto,
  ) {
    return this.fileService.uploadFile(
      body.ownerId,
      file.originalname,
      file.buffer,
    );
  }

  @Get()
  getSignedURL() {}
}
