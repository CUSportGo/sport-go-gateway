import { ApiBody, ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateSportAreaRequestBody {
  name?: string;

  @IsOptional()
  @IsUrl()
  imageURL?: string;

  shower?: boolean;

  carPark?: boolean;

  sportType?: string[];

  location?: string;

  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @IsOptional()
  @IsLongitude()
  longitude?: number;

  description?: string;

  @IsOptional()
  @IsPositive()
  price?: number;
}

export class SportAreaResponse {
  id: string;
  name: string;
  imageURL: string;
  shower: boolean;
  carPark: boolean;
  sportType: string[];
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  price: number;
}
