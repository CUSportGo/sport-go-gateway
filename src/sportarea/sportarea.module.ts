import { Module } from '@nestjs/common';
import { SportareaController } from './sportarea.controller';
import { SportareaService } from './sportarea.service';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'SPORTAREA_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'sportarea',
          protoPath: join(__dirname, '../proto/sportarea.proto'),
          url: process.env.SPORT_SERVICE_GRPC,
        },
      },
    ]),
  ],
  controllers: [SportareaController],
  providers: [SportareaService],
})
export class SportareaModule {}
