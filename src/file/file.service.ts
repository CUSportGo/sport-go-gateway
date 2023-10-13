import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { FileServiceClient, UploadFileRequest } from './file.pb';

@Injectable()
export class FileService implements OnModuleInit {
  private fileClient: FileServiceClient;

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
    return this.fileClient.uploadFile(request);
  }

  async getSignedURL() {}
}
