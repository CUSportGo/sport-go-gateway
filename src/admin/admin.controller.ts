import { Controller, Param, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Patch('/ban/:userId')
  banUser(@Param('userId') userId: string) {
    return this.adminService.banUser(userId);
  }

  @Patch('/unban/:userId')
  unbanUser(@Param('userId') userId: string) {}
}
