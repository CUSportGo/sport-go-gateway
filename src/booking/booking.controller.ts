import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateBookingRequestBody } from './booking.dto';
import { BookingService } from './booking.service';
import { GetAvailableBookingRequest } from './booking.pb';

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
}
