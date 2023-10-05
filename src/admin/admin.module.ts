import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
