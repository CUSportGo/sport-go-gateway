import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { CANCEL_BOOKING_PATTERN, CONFIRM_BOOKING_PATTERN, CREATE_BOOKING_PATTERN } from '../constant/booking.constant';
import { BookingInfo, CreateBookingRequestBody } from './booking.dto';
import { BookingServiceClient, GetAvailableBookingRequest, GetAvailableBookingResponse, ViewBookingHistoryRequest, ViewBookingHistoryResponse } from './booking.pb';
import { catchError, firstValueFrom } from 'rxjs';
import { exceptionHandler } from '../common/exception-handler';

@Injectable()
export class BookingService {
  private bookingClient: BookingServiceClient;
  private readonly logger = new Logger(BookingService.name);

  constructor(@Inject('BOOKING_RMQ_PACKAGE') private rmqClient: ClientProxy, @Inject('BOOKING_PACKAGE') private client: ClientGrpc) { }

  onModuleInit() {
    this.bookingClient = this.client.getService<BookingServiceClient>('BookingService');
  }

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

  public async confirmBooking(bookingId: string, userId: string) {
    try {
      const confirmBooking = { bookingID: bookingId, userID: userId };
      this.rmqClient.emit(CONFIRM_BOOKING_PATTERN, confirmBooking);
      return { isSuccess: true };
    } catch (error) {
      this.logger.error(error);
      if (!(error instanceof HttpException)) {
        throw new InternalServerErrorException('Internal server error');
      }
      throw error;
    }
  }

  async getAvailableBooking(request: GetAvailableBookingRequest): Promise<GetAvailableBookingResponse> {
    return await firstValueFrom(
      this.bookingClient.getAvailableBooking(request).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }

  async viewBookingHistory(request: ViewBookingHistoryRequest): Promise<ViewBookingHistoryResponse> {
    return await firstValueFrom(
      this.bookingClient.viewBookingHistory(request).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }

}
