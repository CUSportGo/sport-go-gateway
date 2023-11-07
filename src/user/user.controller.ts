import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  getAllUser() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserProfile(@Param('id') userId: string) {
    return this.userService.getUserProfile({ userId: userId });
  }
}
