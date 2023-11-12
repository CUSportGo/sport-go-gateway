import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { exceptionHandler } from '../common/exception-handler';
import { User } from '../model/user.dto';
import { GetUserProfileRequest, GetUserProfileResponse, UserServiceClient } from './user.pb';
import { ClientGrpc } from '@nestjs/microservices';


@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService,
    @Inject('USER_PACKAGE') private client: ClientGrpc) {
    this.userClient = this.client.getService<UserServiceClient>('UserService');

  }
  private readonly logger = new Logger(UserService.name);
  private readonly baseURL = process.env.USER_SERVICE_URL;
  private userClient: UserServiceClient;




  async getAllUsers() {
    const requestURL = this.baseURL + '/user';
    const response: AxiosResponse<User[], any> = await firstValueFrom(
      this.httpService.get(requestURL).pipe(
        catchError((error: AxiosError) => {
          console.log(error);
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

  async getUserProfile(request: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    return await firstValueFrom(
      this.userClient.getUserProfile(request).pipe(
        catchError((error) => {
          this.logger.error(error);
          throw error;
        }),
      ),
    );
  }
}
