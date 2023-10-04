import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { exceptionHandler } from '../common/exception-handler';
import { User } from '../model/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) { }
  private readonly logger = new Logger(UserService.name);
  private readonly baseURL = process.env.USER_SERVICE_URL;


    async getAllUsers() {
        const requestURL = this.baseURL + "/user";
        const response: AxiosResponse<User[], any> = await firstValueFrom(this.httpService.get(requestURL).pipe(
            catchError((error: AxiosError) => {

                console.log(error)
                if (!error.response) {
                    throw new ServiceUnavailableException('Service Unavailable');
                }
                this.logger.error(error.response.data);
                const exception = exceptionHandler.getExceptionFromAxios(
                    error.response.data,
                );
                throw exception;
            }),
        )
        )
        return response.data;
    }

}
