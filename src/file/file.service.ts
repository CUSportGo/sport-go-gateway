import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { exceptionHandler } from '../common/exception-handler';
import { FileServiceClient, UploadFileRequest } from './file.pb';

@Injectable()
export class FileService implements OnModuleInit {
  private fileClient: FileServiceClient;
  private readonly logger = new Logger(FileService.name);
  constructor(@Inject('FILE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.fileClient = this.client.getService<FileServiceClient>('FileService');
  }

  async uploadFile(ownerId: string, filename: string, fileBuffer: Buffer) {
    const request: UploadFileRequest = {
      filename: filename,
      data: fileBuffer,
      userId: ownerId,
    };
    return await firstValueFrom(
      this.fileClient.uploadFile(request).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }

  async getSignedURL() {}
}
