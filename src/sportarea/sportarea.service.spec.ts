import { Test, TestingModule } from '@nestjs/testing';
import { SportareaService } from './sportarea.service';

describe('SportareaService', () => {
  let service: SportareaService;
  const mockJwtService = {
    create: jest.fn(),
  };
  const mockClientGrpc = {
    getService: jest.fn(),
    getClientByServiceName: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SportareaService,
        {
          provide: 'SPORTAREA_PACKAGE',
          useValue: mockClientGrpc,
        },
      ],
    }).compile();

    service = module.get<SportareaService>(SportareaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
