import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosError } from 'axios';

const getException = (error: any) => {
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

export const axiosException = {
  getException,
};
