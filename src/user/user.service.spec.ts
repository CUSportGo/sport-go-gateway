import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { HttpService } from '@nestjs/axios';

describe('UserService', () => {
  let service: UserService;
  const mockHttpService = {
    get: jest.fn(),
  };
  const mockClientGrpc = {
    getService: jest.fn(),
    getClientByServiceName: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: "USER_PACKAGE",
          useValue: mockClientGrpc,
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
