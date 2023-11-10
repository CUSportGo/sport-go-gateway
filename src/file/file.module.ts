import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'FILE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'file',
          protoPath: join(__dirname, '../proto/file.proto'),
          url: process.env.FILE_SERVICE_GRPC,
        },
      },
    ]),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
