import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FILE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'file',
          protoPath: join(__dirname, '../proto/file.proto'),
          url: 'localhost:8086',
        },
      },
    ]),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
