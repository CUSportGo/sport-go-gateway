import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';

import { ClientGrpc } from '@nestjs/microservices';
import { Response } from 'express';
import { catchError, firstValueFrom, map } from 'rxjs';
import { exceptionHandler } from '../common/exception-handler';
import {
  CreateSportareaRequest,
  CreateSportareaResponse,
  SportareaServiceClient,
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
}
