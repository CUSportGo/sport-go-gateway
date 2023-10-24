import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CreateSportareaRequest, GetSportAreaByIdRequest, SearchSportAreaRequest } from './sportarea.pb';
import { SportareaService } from './sportarea.service';

@Controller('sportarea')
export class SportareaController {
  constructor(private sportareaService: SportareaService) { }

  @Post()
  create(@Body() req: CreateSportareaRequest) {
    return this.sportareaService.create(req);
  }

  @Get(':id')
  getSportAreaById(@Param("id") sportAreaId: string) {
    return this.sportareaService.getSportAreaById({ id: sportAreaId });
  }

  @Get()
  searchSportArea(
    @Query('type') type: string,
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
}
