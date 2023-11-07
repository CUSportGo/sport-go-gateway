import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AddSportAreaRequest, SearchSportAreaRequest } from './sportarea.pb';
import { SportareaService } from './sportarea.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateSportareaRequestDto,
  SearchSportAreaQuery,
  SportAreaResponse,
  UpdateSportAreaRequestBody,
} from './sportarea.dto';
import { SportTypeEnum } from '../model/enum/sportType.enum';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('sportarea')
@ApiTags('sportarea')
export class SportareaController {
  constructor(private sportareaService: SportareaService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  create(
    @Body() body: CreateSportareaRequestDto,
    @Req() request: any,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 20000000 })],
      }),
    )
    files: Express.Multer.File[],
  ) {
    const userId = request.userId;
    return this.sportareaService.create(body, userId, files);
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
