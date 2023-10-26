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
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUrl()
  imageURL?: string;

  @IsOptional()
  @IsBoolean()
  shower?: boolean;

  @IsOptional()
  @IsBoolean()
  carPark?: boolean;

  @IsOptional()
  @IsArray()
  @IsString()
  sportTyle?: string[];

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @IsOptional()
  @IsLongitude()
  longitude?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsPositive()
  price?: number;
}
