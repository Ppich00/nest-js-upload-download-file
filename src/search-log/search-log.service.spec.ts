import { Test, TestingModule } from '@nestjs/testing';
import { SearchLogService } from './search-log.service';

describe('SearchLogService', () => {
  let service: SearchLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchLogService],
    }).compile();

    service = module.get<SearchLogService>(SearchLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
