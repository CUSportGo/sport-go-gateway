import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateBookingRequestBody } from './booking.dto';
import { BookingService } from './booking.service';

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

  @Post('cancel/:id')
  cancelBooking(@Req() request: any) {
    const bookingId = request.params.id;
    const userId = request.userId;
    return this.bookingService.cancelBooking(bookingId, userId);
  }
}
