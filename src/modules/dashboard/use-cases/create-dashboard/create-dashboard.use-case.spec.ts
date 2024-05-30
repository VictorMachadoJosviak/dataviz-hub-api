import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { Dashboard } from '../../entities/dashboard.entity';
import {
  createDashboardEntityFixture,
  createDashboardFixture,
} from '../../fixtures/create-dashboard.fixture';
import { findOneDashboardsResponseFixture } from '../../fixtures/find-one-dashboard.fixture';
import { CreateDashboardUseCase } from './create-dashboard.use-case';

const mockEntityManager = {
  create: jest.fn().mockReturnValue(createDashboardEntityFixture),
  persistAndFlush: jest.fn(),
};

const dashboardRepository = {
  getEntityManager: jest.fn().mockReturnValue({
    transactional: jest
      .fn()
      .mockImplementation(async (cb) => cb(mockEntityManager)),
  }),
};

describe('CreateDashboardUseCase', () => {
  let useCase: CreateDashboardUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateDashboardUseCase,
        {
          provide: getRepositoryToken(Dashboard),
          useValue: dashboardRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateDashboardUseCase>(CreateDashboardUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create dashboard', async () => {
    const result = await useCase.execute(createDashboardFixture);
    expect(result).toStrictEqual({
      ...findOneDashboardsResponseFixture,
      metrics: [],
      origins: [],
      responsibles: [],
    });

    expect(dashboardRepository.getEntityManager).toHaveBeenCalledTimes(1);
    expect(mockEntityManager.create).toHaveBeenCalledTimes(2);
    expect(mockEntityManager.persistAndFlush).toHaveBeenCalledTimes(1);
  });
});
