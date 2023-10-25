import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import {
  CreateSportareaRequest,
  GetSportAreaByIdRequest,
  SearchSportAreaRequest,
  UpdateAreaRequest,
  UpdateAreaResponse,
} from './sportarea.pb';
import { SportareaService } from './sportarea.service';
import { Request } from 'express';

@Controller('sportarea')
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

  @Post('/updateAreaInfo')
  updateAreaInfo(@Body() req: UpdateAreaRequest): Promise<UpdateAreaResponse> {
    return this.sportareaService.updateAreaInfo(req);
  }
}
