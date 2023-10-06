import { Test, TestingModule } from '@nestjs/testing';
import { SportareaService } from './sportarea.service';

describe('SportareaService', () => {
  let service: SportareaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SportareaService],
    }).compile();

    service = module.get<SportareaService>(SportareaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
