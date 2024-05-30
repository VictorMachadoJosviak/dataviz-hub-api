import { Test, TestingModule } from '@nestjs/testing';
import { PageableQueryRequest } from '../../../../common/pagination/pagination.dto';
import { UpdateDashboardDto } from '../../dto/request/update-dashboard/update-dashboard.dto';
import { createDashboardFixture } from '../../fixtures/create-dashboard.fixture';
import { findAllDashboardsResponseFixture } from '../../fixtures/find-all-dashboard.fixture';
import { findOneDashboardsResponseFixture } from '../../fixtures/find-one-dashboard.fixture';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardController } from './dashboard.controller';

const mockDashboardService = {
  create: jest.fn().mockResolvedValue(createDashboardFixture),
  findAll: jest.fn().mockResolvedValue(findAllDashboardsResponseFixture),
  findOne: jest.fn().mockResolvedValue(findOneDashboardsResponseFixture),
  update: jest.fn().mockResolvedValue(findOneDashboardsResponseFixture),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('DashboardController', () => {
  let controller: DashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        {
          provide: DashboardService,
          useValue: mockDashboardService,
        },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should return a new dashboard', async () => {
      const spyCreate = jest.spyOn(mockDashboardService, 'create');

      const result = await controller.create(createDashboardFixture);

      expect(result).toStrictEqual(createDashboardFixture);

      expect(spyCreate).toHaveBeenCalledTimes(1);
      expect(spyCreate).toHaveBeenCalledWith(createDashboardFixture);
    });
  });

  describe('findAll', () => {
    it('should return a list of dashboards', async () => {
      const spyFindAll = jest.spyOn(mockDashboardService, 'findAll');
      const filters: PageableQueryRequest = { page: 1, pageSize: 10 };

      const result = await controller.findAll(filters);

      expect(result).toStrictEqual(findAllDashboardsResponseFixture);

      expect(spyFindAll).toHaveBeenCalledTimes(1);
      expect(spyFindAll).toHaveBeenCalledWith(filters);
    });
  });

  describe('findOne', () => {
    it('should find one dashboard by id', async () => {
      const spyFindOne = jest.spyOn(mockDashboardService, 'findOne');

      const dashboardId = '1';

      const result = await controller.findOne(dashboardId);

      expect(result).toStrictEqual(findOneDashboardsResponseFixture);

      expect(spyFindOne).toHaveBeenCalledTimes(1);
      expect(spyFindOne).toHaveBeenCalledWith(dashboardId);
    });
  });

  describe('update', () => {
    it('should update one dashboard by id', async () => {
      const spyUpdate = jest.spyOn(mockDashboardService, 'update');

      const dashboardId = '1';

      const updateDashboardFixture: UpdateDashboardDto = {
        name: 'Updated name',
      };

      const result = await controller.update(
        dashboardId,
        updateDashboardFixture,
      );

      expect(result).toStrictEqual(findOneDashboardsResponseFixture);

      expect(spyUpdate).toHaveBeenCalledTimes(1);
      expect(spyUpdate).toHaveBeenCalledWith(
        dashboardId,
        updateDashboardFixture,
      );
    });
  });

  describe('remove', () => {
    it('should remove one dashboard by id', async () => {
      const spyUpdate = jest.spyOn(mockDashboardService, 'remove');

      const dashboardId = '1';

      await controller.remove(dashboardId);

      expect(spyUpdate).toHaveBeenCalledTimes(1);
      expect(spyUpdate).toHaveBeenCalledWith(dashboardId);
    });
  });
});
