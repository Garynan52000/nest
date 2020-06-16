import { Test, TestingModule } from '@nestjs/testing';
import { UseValue } from './use-value';

describe('UseValue', () => {
  let provider: UseValue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UseValue],
    }).compile();

    provider = module.get<UseValue>(UseValue);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
