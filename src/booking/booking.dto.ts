import { IsDefined, IsString, IsNotEmpty, IsRFC3339 } from 'class-validator';

export class CreateBookingRequestBody {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  sportAreaID: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  areaID: string;

  @IsDefined()
  @IsString()
  @IsRFC3339()
  startAt: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsRFC3339()
  endAt: string;
}

export interface BookingInfo {
  sportAreaID: string;
  areaID: string;
  userID: string;
  startAt: string;
  endAt: string;
}
