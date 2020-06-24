import { Test, TestingModule } from '@nestjs/testing';
import { EntityRepositoryController } from './entity-repository.controller';

describe('EntityRepository Controller', () => {
  let controller: EntityRepositoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntityRepositoryController],
    }).compile();

    controller = module.get<EntityRepositoryController>(EntityRepositoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
