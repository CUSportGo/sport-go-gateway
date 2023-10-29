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
import { catchError, firstValueFrom, map, Subject } from 'rxjs';
import { exceptionHandler } from '../common/exception-handler';
import {
  CreateSportareaRequest,
  CreateSportareaResponse,
  GetSportAreaByIdRequest,
  GetSportAreaByIdResponse,
  SearchSportAreaRequest,
  SearchSportAreaResponse,
  SportareaServiceClient,
  UpdateAreaRequest,
  UpdateAreaResponse,
} from './sportarea.pb';
@Injectable()
export class SportareaService implements OnModuleInit {
  private sportareaClient: SportareaServiceClient;
  private readonly logger = new Logger(SportareaService.name);
  private searchSportAreaSubject: Subject<SearchSportAreaResponse> =
    new Subject<SearchSportAreaResponse>();

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
    if (request.maxDistance == undefined) {
      request.maxDistance = 10;
    }
    if (request.date == undefined) {
      const currentDate = new Date();
      if ((currentDate.getHours() + 1) % 24 == 0) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();
      request.date = `${currentYear}-${currentMonth
        .toString()
        .padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`;
    }

    if (request.startTime == undefined) {
      const currentDate = new Date();
      const startHour = (currentDate.getHours() + 1) % 24;
      request.startTime = `${startHour.toString().padStart(2, '0')}:00`;
    }

    if (request.endTime == undefined) {
      const currentDate = new Date();
      const endHour = (currentDate.getHours() + 2) % 24;
      request.endTime = `${endHour.toString().padStart(2, '0')}:00`;
    }

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
}
