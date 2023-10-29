import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CANCEL_BOOKING_PATTERN, CREATE_BOOKING_PATTERN } from '../constant/booking.constant';
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
      const bookingStartAt = new Date(booking.startAt);
      const bookingEndAt = new Date(booking.endAt);
      if (bookingStartAt >= bookingEndAt) {
        throw new BadRequestException('Invalid request body');
      }
      const createBooking: BookingInfo = { ...booking, userID: userId };
      this.rmqClient.emit(CREATE_BOOKING_PATTERN, createBooking);
      return { isSuccess: true };
    } catch (error) {
      this.logger.error(error);
      if (!(error instanceof HttpException)) {
        throw new InternalServerErrorException('Internal server error');
      }
      throw error;
    }
  }

  public async cancelBooking(bookingId: string, userId: string) {
    try {
      const cancelBooking = { bookingID: bookingId, userID: userId };
      this.rmqClient.emit(CANCEL_BOOKING_PATTERN, cancelBooking);
      return { isSuccess: true };
    } catch (error) {
      this.logger.error(error);
      if (!(error instanceof HttpException)) {
        throw new InternalServerErrorException('Internal server error');
      }
      throw error;
    }
  }
}
