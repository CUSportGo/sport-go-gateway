import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
describe('AuthService', () => {
  let service: AuthService;
  const mockJwtService = {
    sign: jest.fn(),
  };
  const mockClientGrpc = {
    getService: jest.fn(),
    getClientByServiceName: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, {
        provide: 'AUTH_PACKAGE',
        useValue: mockClientGrpc
      }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
