import { Test, TestingModule } from '@nestjs/testing';
import { CluesController } from './clues.controller';

describe('CluesController', () => {
  let controller: CluesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CluesController],
    }).compile();

    controller = module.get<CluesController>(CluesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
