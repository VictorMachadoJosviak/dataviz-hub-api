import { Test, TestingModule } from '@nestjs/testing';
import { FindUserUseCase } from './find-user.use-case';

describe('UsersService', () => {
  let service: FindUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUserUseCase],
    }).compile();

    service = module.get<FindUserUseCase>(FindUserUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
