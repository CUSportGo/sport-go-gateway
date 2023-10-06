import { Test, TestingModule } from '@nestjs/testing';
import { SportareaController } from './sportarea.controller';
import { SportareaService } from './sportarea.service';

describe('SportareaController', () => {
  let controller: SportareaController;
  const mockAuthService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportareaController],
      providers: [
        {
          provide: SportareaService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<SportareaController>(SportareaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
