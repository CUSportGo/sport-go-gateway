import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CreateBookingRequestBody } from './booking.dto';
import { BookingService } from './booking.service';
import {
  GetAvailableBookingRequest,
  ViewBookingHistoryRequest,
  GetPendingBookingRequest,
} from './booking.pb';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  createBooking(
    @Body() booking: CreateBookingRequestBody,
    @Req() request: any,
  ) {
    const userId = request.userId;
    return this.bookingService.createBooking(booking, userId);
  }

  @Post('available')
  getAvailableBooking(@Body() request: GetAvailableBookingRequest) {
    return this.bookingService.getAvailableBooking(request);
  }

  @Post('cancel/:id')
  cancelBooking(@Req() request: any) {
    const bookingId = request.params.id;
    const userId = request.userId;
    return this.bookingService.cancelBooking(bookingId, userId);
  }

  @Post('confirm/:id')
  confirmBooking(@Req() request: any) {
    const bookingId = request.params.id;
    const userId = request.userId;
    return this.bookingService.confirmBooking(bookingId, userId);
  }

  @Post('decline/:id')
  declineBooking(@Req() request: any) {
    const bookingId = request.params.id;
    const userId = request.userId;
    return this.bookingService.declineBooking(bookingId, userId);
  }

  @Get('viewBookingHistory')
  viewBookingHistory(@Req() request: any) {
    return this.bookingService.viewBookingHistory({ userId: request.userId });
  }

  @Get('pending/:SportAreaId')
  getPendingBooking(@Param() request: GetPendingBookingRequest) {
    return this.bookingService.getPendingBooking(request);
  }
}
