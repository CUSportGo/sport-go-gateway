import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  CreateSportareaRequest,
  GetSportAreaByIdRequest,
  SearchSportAreaRequest,
} from './sportarea.pb';
import { SportareaService } from './sportarea.service';
import { Request } from 'express';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SportAreaResponse, UpdateSportAreaRequestBody } from './sportarea.dto';

@Controller('sportarea')
@ApiTags('sportarea')
export class SportareaController {
  constructor(private sportareaService: SportareaService) {}

  @Post()
  create(@Req() request) {
    const createReq = { ...request.body, userId: request.userId };
    return this.sportareaService.create(createReq);
  }

  @Get(':id')
  getSportAreaById(@Param('id') sportAreaId: string) {
    return this.sportareaService.getSportAreaById({ id: sportAreaId });
  }

  @Get()
  searchSportArea(
    @Query('type') type: string[],
    @Query('location') location: string,
    @Query('maxDistance') maxDistance: number,
    @Query('latitude') latitude: number,
    @Query('longitude') longtitude: number,
    @Query('date') date: string,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    const request: SearchSportAreaRequest = {
      sportType: type,
      location: location,
      maxDistance: maxDistance,
      userLatitude: latitude,
      userLongitude: longtitude,
      date: date,
      startTime: startTime,
      endTime: endTime,
    };
    return this.sportareaService.searchSportArea(request);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Update sport area successfully',
    type: SportAreaResponse,
  })
  updateSportArea(
    @Param('id') sportAreaId: string,
    @Body() body: UpdateSportAreaRequestBody,
    @Req() request: any,
  ) {
    const userId = request.userId;
    return this.sportareaService.updateSportArea(body, sportAreaId, userId);
  }
}
