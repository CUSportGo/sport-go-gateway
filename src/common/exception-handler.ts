import { status } from '@grpc/grpc-js';
import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';

const getExceptionFromAxios = (error: any) => {
  const statusCode = error.statusCode;
  const message = error.message;
  switch (statusCode) {
    case HttpStatus.BAD_REQUEST: {
      return new BadRequestException(message);
    }
    case HttpStatus.UNAUTHORIZED: {
      return new UnauthorizedException(message);
    }
    case HttpStatus.FORBIDDEN: {
      return new ForbiddenException(message);
    }
    case HttpStatus.NOT_FOUND: {
      return new NotFoundException(message);
    }
    default: {
      return new InternalServerErrorException(message);
    }
  }
};

const getExceptionFromGrpc = (error: any) => {
  const statusCode = error.code;
  const message = error.message;
  switch (statusCode) {
    case status.ALREADY_EXISTS: {
      throw new BadRequestException(message);
    }
    case status.INVALID_ARGUMENT: {
      throw new BadRequestException(message);
    }
    case status.UNAUTHENTICATED: {
      throw new UnauthorizedException(message);
    }
    case status.PERMISSION_DENIED: {
      throw new ForbiddenException(message);
    }
    case status.NOT_FOUND: {
      throw new NotFoundException(message);
    }
    case status.UNAVAILABLE: {
      throw new ServiceUnavailableException(message);
    }
    default: {
      throw new InternalServerErrorException(message);
    }
  }
};

export const exceptionHandler = {
  getExceptionFromAxios,
  getExceptionFromGrpc,
};
