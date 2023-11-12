import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  getAllUser() {
    return this.userService.getAllUsers();
  }

  @Get("/userProfile")
  getUserProfile(@Req() request: any) {
    return this.userService.getUserProfile({ userId: request.userId })
  }
}
