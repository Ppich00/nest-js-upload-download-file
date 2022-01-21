import { Test, TestingModule } from '@nestjs/testing';
import { SearchLogController } from './search-log.controller';

describe('SearchLogController', () => {
  let controller: SearchLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchLogController],
    }).compile();

    controller = module.get<SearchLogController>(SearchLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
