import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { UserType } from '../types/enum/userType.enum';

export class LoginRequestDto {
  email: string;
  password: string;
}

export class LoginResponseDto {
  credential: Credential;
}

export class RegisterRequestDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  role: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterResponseDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

class Credential {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}
