import { Test, TestingModule } from '@nestjs/testing';
import { EntityRepositoryService } from './entity-repository.service';

describe('EntityRepositoryService', () => {
  let service: EntityRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntityRepositoryService],
    }).compile();

    service = module.get<EntityRepositoryService>(EntityRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
