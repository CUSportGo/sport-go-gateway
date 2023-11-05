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
  AddSportAreaRequest,
  CreateSportareaRequest,
  GetSportAreaByIdRequest,
  SearchSportAreaRequest,
  UpdateAreaResponse,
} from './sportarea.pb';
import { SportareaService } from './sportarea.service';
import { Request } from 'express';
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  SearchSportAreaQuery,
  SportAreaResponse,
  UpdateAreaRequest,
  UpdateSportAreaRequestBody,
} from './sportarea.dto';
import { SportTypeEnum } from '../model/enum/sportType.enum';

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
  @ApiQuery({
    name: 'type',
    enum: SportTypeEnum,
    isArray: true,
    required: false,
  })
  searchSportArea(@Query() query: SearchSportAreaQuery, @Query('type') type) {
    let sportType = [];
    if (type || type instanceof String) {
      sportType.push(type);
    } else {
      sportType = type;
    }
    const request: SearchSportAreaRequest = {
      sportType: sportType,
      keyword: query.keyword || '',
      maxDistance: query.maxDistance || 10,
      userLatitude: query.latitude,
      userLongitude: query.longitude,
    };
    return this.sportareaService.searchSportArea(request);
  }

  @Post('/updateAreaInfo')
  updateAreaInfo(@Body() req: UpdateAreaRequest): Promise<UpdateAreaResponse> {
    return this.sportareaService.updateAreaInfo(req);
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

  @Patch(':id/area')
  addSportArea(@Param('id') sportAreaId: string, @Req() request: any) {
    const req: AddSportAreaRequest = {
      ...request.body,
      id: sportAreaId,
    };
    return this.sportareaService.addSportArea(req);
  }
}
