import { Module } from '@nestjs/common';
import { SportareaController } from './sportarea.controller';
import { SportareaService } from './sportarea.service';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SPORTAREA_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'sportarea',
          protoPath: join(__dirname, '../proto/sportarea.proto'),
          url: 'localhost:8083',
        },
      },
    ]),
  ],
  controllers: [SportareaController],
  providers: [SportareaService],
})
export class SportareaModule {}
