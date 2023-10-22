import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CREATE_BOOKING_PATTERN } from '../constant/booking.constant';
import { BookingInfo, CreateBookingRequestBody } from './booking.dto';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(@Inject('BOOKING_RMQ_PACKAGE') private rmqClient: ClientProxy) {}

  public async createBooking(
    booking: CreateBookingRequestBody,
    userId: string,
  ) {
    try {
      const createBooking: BookingInfo = { ...booking, userID: userId };
      this.rmqClient.emit(CREATE_BOOKING_PATTERN, createBooking);
      return { isSuccess: true };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
