import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';
import { AxiosError, AxiosResponse } from 'axios';
import { request } from 'http';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { exceptionHandler } from '../common/exception-handler';
import { User } from '../model/user.dto';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);
  private readonly baseURL = process.env.ADMIN_SERVICE_URL;

  constructor(private readonly httpService: HttpService) {}

  async banUser(userId: string) {
    const requestURL =
      this.baseURL + '/user/ban/{userId}'.replace('{userId}', userId);

    const response: AxiosResponse<User, any> = await firstValueFrom(
      this.httpService.patch<User>(requestURL).pipe(
        catchError((error: AxiosError) => {
          if (!error.response) {
            throw new ServiceUnavailableException('Service Unavailable');
          }
          this.logger.error(error.response.data);
          const exception = exceptionHandler.getExceptionFromAxios(
            error.response.data,
          );
          throw exception;
        }),
      ),
    );

    return response.data;
  }

  async unbanUser(userId: string) {
    const requestURL =
      this.baseURL + '/user/unban/{userId}'.replace('{userId}', userId);

    const response: AxiosResponse<User, any> = await firstValueFrom(
      this.httpService.patch<User>(requestURL).pipe(
        catchError((error: AxiosError) => {
          if (!error.response) {
            throw new ServiceUnavailableException('Service Unavailable');
          }
          this.logger.error(error.response.data);
          const exception = exceptionHandler.getExceptionFromAxios(
            error.response.data,
          );
          throw exception;
        }),
      ),
    );

    return response.data;
  }
}
