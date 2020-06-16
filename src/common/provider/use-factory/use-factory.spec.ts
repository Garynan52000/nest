import { Test, TestingModule } from '@nestjs/testing';
import { UseFactory } from './use-factory';

describe('UseFactory', () => {
  let provider: UseFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UseFactory],
    }).compile();

    provider = module.get<UseFactory>(UseFactory);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
