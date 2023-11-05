import { ApiParam, ApiProperty, ApiQuery } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsPositive,
  IsUrl,
  IsMilitaryTime,
} from 'class-validator';
import { SportTypeEnum } from '../model/enum/sportType.enum';

export class UpdateAreaRequest {
  timeField: string;
  id: string;
  sportType: string;
  areaId: string;
  name: string;
  @IsMilitaryTime()
  openTime: string;
  @IsMilitaryTime()
  closeTime: string;
  price: string;
}

export class UpdateSportAreaRequestBody {
  name?: string;

  @IsOptional()
  @IsUrl()
  image?: string[];

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

export class SearchSportAreaQuery {
  keyword?: string;
  maxDistance?: number;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}

export class SportAreaResponse {
  id: string;
  name: string;
  image: string[];
  shower: boolean;
  carPark: boolean;
  sportType: string[];
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  price: number;
}
