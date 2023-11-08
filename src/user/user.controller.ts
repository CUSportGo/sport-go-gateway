import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  getAllUser() {
    return this.userService.getAllUsers();
  }

  @Get(':accessToken')
  getUserProfile(@Param('accessToken') accessToken: string) {
    return this.userService.getUserProfile({ accessToken: accessToken });
  }
}
