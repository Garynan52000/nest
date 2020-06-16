import { Test, TestingModule } from '@nestjs/testing';
import { Async } from './async';

describe('Async', () => {
  let provider: Async;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Async],
    }).compile();

    provider = module.get<Async>(Async);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
