import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';

import { ClientGrpc } from '@nestjs/microservices';
import { Response } from 'express';
import { request } from 'http';
import { catchError, firstValueFrom, map, Subject } from 'rxjs';
import { exceptionHandler } from '../common/exception-handler';
import { UpdateSportAreaRequestBody } from './sportarea.dto';
import {
  AddSportAreaRequest,
  CreateSportareaRequest,
  CreateSportareaResponse,
  GetSportAreaByIdRequest,
  GetSportAreaByIdResponse,
  SearchSportAreaRequest,
  SearchSportAreaResponse,
  SportareaServiceClient,
  UpdateAreaRequest,
  UpdateAreaResponse,
  UpdateSportAreaRequest,
} from './sportarea.pb';
@Injectable()
export class SportareaService implements OnModuleInit {
  private sportareaClient: SportareaServiceClient;
  private readonly logger = new Logger(SportareaService.name);

  constructor(@Inject('SPORTAREA_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.sportareaClient =
      this.client.getService<SportareaServiceClient>('SportareaService');
  }

  async create(req: CreateSportareaRequest): Promise<CreateSportareaResponse> {
    return await firstValueFrom(
      this.sportareaClient.create(req).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }

  async getSportAreaById(
    req: GetSportAreaByIdRequest,
  ): Promise<GetSportAreaByIdResponse> {
    return await firstValueFrom(
      this.sportareaClient.getSportAreaById(req).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }

  async searchSportArea(request: SearchSportAreaRequest) {
    return await firstValueFrom(
      this.sportareaClient.searchSportArea(request).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }

  async updateAreaInfo(req: UpdateAreaRequest): Promise<UpdateAreaResponse> {
    const timeFormat = /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeFormat.test(req.openTime) || !timeFormat.test(req.closeTime)) {
      throw new BadRequestException('invalid time format');
    }

    return await firstValueFrom(
      this.sportareaClient.updateArea(req).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }

  async updateSportArea(
    requestBody: UpdateSportAreaRequestBody,
    sportAreaId: string,
    userId: string,
  ) {
    const updateSportArea: UpdateSportAreaRequest = {
      id: sportAreaId,
      name: requestBody.name,
      image: requestBody.image,
      shower: requestBody.shower,
      carPark: requestBody.carPark,
      sportType: requestBody.sportType,
      location: requestBody.location,
      latitude: requestBody.latitude,
      longtitude: requestBody.longitude,
      description: requestBody.description,
      price: requestBody.price,
      userId: userId,
    };

    return await firstValueFrom(
      this.sportareaClient.updateSportArea(updateSportArea).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }

  async addSportArea(req: AddSportAreaRequest) {
    return await firstValueFrom(
      this.sportareaClient.addSportArea(req).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }
}
