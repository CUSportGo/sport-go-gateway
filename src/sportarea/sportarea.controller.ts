import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import {
  CreateSportareaRequest,
  CreateSportareaResponse,
} from './sportarea.pb';
import { SportareaService } from './sportarea.service';

@Controller('sportarea')
export class SportareaController {
  constructor(private sportareaService: SportareaService) {}
  @Post('create')
  create(@Body() req: CreateSportareaRequest) {
    return this.sportareaService.create(req);
  }
}
