import { status } from '@grpc/grpc-js';
import {
  ExecutionContext,
  CallHandler,
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { catchError, Observable, throwError } from 'rxjs';

export class RpcExceptionInterceptor implements GrpcToHttpInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        console.log(err);

        let error: any;
        const statusCode = err.code;
        const message = err.message;
        switch (statusCode) {
          case status.PERMISSION_DENIED: {
            error = new ForbiddenException(message);
            break;
          }
          case status.UNAVAILABLE: {
            error = new ServiceUnavailableException(message);
            break;
          }
          default: {
            error = new InternalServerErrorException(message);
            break;
          }
        }

        return throwError(() => error);
      }),
    );
  }
}
