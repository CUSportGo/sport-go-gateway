import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';

describe('BookingService', () => {
  let service: BookingService;
  const mockClientProxy = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: 'BOOKING_RMQ_PACKAGE',
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
