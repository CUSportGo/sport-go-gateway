import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { HttpService } from '@nestjs/axios';

describe('AdminService', () => {
  let service: AdminService;
  const mockHttpService = {
    patch: jest.fn(),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService, {
        provide: HttpService,
        useValue: mockHttpService,
      }],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
