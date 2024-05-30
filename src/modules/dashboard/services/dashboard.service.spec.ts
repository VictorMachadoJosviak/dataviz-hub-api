import { Test, TestingModule } from '@nestjs/testing';
import { PageableQueryRequest } from '../../../common/pagination/pagination.dto';
import { UpdateDashboardDto } from '../dto/request/update-dashboard/update-dashboard.dto';
import { createDashboardFeedbackFixture } from '../fixtures/create-dashboard-feedback.fixture';
import { createDashboardFixture } from '../fixtures/create-dashboard.fixture';
import { findAllDashboardsResponseFixture } from '../fixtures/find-all-dashboard.fixture';
import { findOneDashboardsResponseFixture } from '../fixtures/find-one-dashboard.fixture';
import { listDashboardFeedbacksResponseFixture } from '../fixtures/list-all-dashboard-feedbacks.fixture';
import {
  CREATE_DASHBOARD_FEEDBACK_USE_CASE,
  ICreateDashboardFeedbackUseCase,
} from '../use-cases/create-dashboard-feedback/create-dashboard-feedback.use-case';
import {
  CREATE_DASHBOARD_USE_CASE,
  ICreateDashboardUseCase,
} from '../use-cases/create-dashboard/create-dashboard.use-case';
import {
  DELETE_DASHBOARD_FEEDBACK_USE_CASE,
  IDeleteDashboardFeedbackUseCase,
} from '../use-cases/delete-dashboard-feedback/delete-dashboard-feedback.use-case';
import {
  DELETE_DASHBOARD_USE_CASE,
  IDeleteDashboardUseCase,
} from '../use-cases/delete-dashboard/delete-dashboard.use-case';
import {
  GET_DASHBOARD_USE_CASE,
  IGetDashboardUseCase,
} from '../use-cases/get-dashboard/list-dashboard.use-case';
import {
  IListDashboardFeedbackUseCase,
  LIST_DASHBOARD_FEEDBACK_USE_CASE,
} from '../use-cases/list-dashboard-feedback/list-dashboard-feedback.use-case';
import {
  IListDashboardsUseCase,
  LIST_DASHBOARD_USE_CASE,
} from '../use-cases/list-dashboards/list-dashboard.use-case';
import {
  IUpdateDashboardUseCase,
  UPDATE_DASHBOARD_USE_CASE,
} from '../use-cases/update-dashboard/update-dashboard.use-case';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;

  let createDashboardUseCase: ICreateDashboardUseCase;
  let listDashboardUseCase: IListDashboardsUseCase;
  let getDashboardUseCase: IGetDashboardUseCase;
  let updateDashboardUseCase: IUpdateDashboardUseCase;
  let deleteDashboardUseCase: IDeleteDashboardUseCase;
  let createDashboardFeedbackUseCase: ICreateDashboardFeedbackUseCase;
  let listDashboardFeedbackUseCase: IListDashboardFeedbackUseCase;
  let deleteDashboardFeedbackUseCase: IDeleteDashboardFeedbackUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: CREATE_DASHBOARD_USE_CASE,
          useValue: {
            execute: jest
              .fn()
              .mockResolvedValue(findOneDashboardsResponseFixture),
          },
        },
        {
          provide: LIST_DASHBOARD_USE_CASE,
          useValue: {
            execute: jest
              .fn()
              .mockResolvedValue(findAllDashboardsResponseFixture),
          },
        },
        {
          provide: GET_DASHBOARD_USE_CASE,
          useValue: {
            execute: jest
              .fn()
              .mockResolvedValue(findOneDashboardsResponseFixture),
          },
        },
        {
          provide: UPDATE_DASHBOARD_USE_CASE,
          useValue: {
            execute: jest
              .fn()
              .mockResolvedValue(findOneDashboardsResponseFixture),
          },
        },
        {
          provide: DELETE_DASHBOARD_USE_CASE,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: CREATE_DASHBOARD_FEEDBACK_USE_CASE,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: LIST_DASHBOARD_FEEDBACK_USE_CASE,
          useValue: {
            execute: jest
              .fn()
              .mockResolvedValue(listDashboardFeedbacksResponseFixture),
          },
        },
        {
          provide: DELETE_DASHBOARD_FEEDBACK_USE_CASE,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    createDashboardUseCase = module.get<ICreateDashboardUseCase>(
      CREATE_DASHBOARD_USE_CASE,
    );
    listDashboardUseCase = module.get<IListDashboardsUseCase>(
      LIST_DASHBOARD_USE_CASE,
    );
    getDashboardUseCase = module.get<IGetDashboardUseCase>(
      GET_DASHBOARD_USE_CASE,
    );
    updateDashboardUseCase = module.get<IUpdateDashboardUseCase>(
      UPDATE_DASHBOARD_USE_CASE,
    );
    deleteDashboardUseCase = module.get<IDeleteDashboardUseCase>(
      DELETE_DASHBOARD_USE_CASE,
    );
    createDashboardFeedbackUseCase =
      module.get<ICreateDashboardFeedbackUseCase>(
        CREATE_DASHBOARD_FEEDBACK_USE_CASE,
      );
    listDashboardFeedbackUseCase = module.get<IListDashboardFeedbackUseCase>(
      LIST_DASHBOARD_FEEDBACK_USE_CASE,
    );
    deleteDashboardFeedbackUseCase =
      module.get<IDeleteDashboardFeedbackUseCase>(
        DELETE_DASHBOARD_FEEDBACK_USE_CASE,
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(createDashboardUseCase).toBeDefined();
    expect(listDashboardUseCase).toBeDefined();
    expect(getDashboardUseCase).toBeDefined();
    expect(updateDashboardUseCase).toBeDefined();
    expect(deleteDashboardUseCase).toBeDefined();
    expect(createDashboardFeedbackUseCase).toBeDefined();
    expect(listDashboardFeedbackUseCase).toBeDefined();
    expect(deleteDashboardFeedbackUseCase).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('feedback', () => {
    it('should delete a feedback', async () => {
      const feedbackId = '1';

      const spyDeleteFeedback = jest.spyOn(
        deleteDashboardFeedbackUseCase,
        'execute',
      );

      await service.deleteFeedback(feedbackId);

      expect(spyDeleteFeedback).toHaveBeenCalledWith(feedbackId);
    });

    it('should list dashboard feedbacks', async () => {
      const dashboardId = '1';

      const spyListFeedbacks = jest.spyOn(
        listDashboardFeedbackUseCase,
        'execute',
      );

      const filters: PageableQueryRequest = {
        page: 1,
        pageSize: 10,
      };

      const result = await service.listFeedbacks(dashboardId, filters);

      expect(result).toStrictEqual(listDashboardFeedbacksResponseFixture);

      expect(spyListFeedbacks).toHaveBeenCalledTimes(1);
      expect(spyListFeedbacks).toHaveBeenCalledWith({
        dashboardId: '1',
        page: 1,
        pageSize: 10,
      });
    });

    it('should create dashboard feedback', async () => {
      const dashboardId = '1';
      const userId = '1';

      const spyCreateFeedback = jest.spyOn(
        createDashboardFeedbackUseCase,
        'execute',
      );

      await service.createFeedback(
        dashboardId,
        userId,
        createDashboardFeedbackFixture,
      );

      expect(spyCreateFeedback).toHaveBeenCalledTimes(1);
      expect(spyCreateFeedback).toHaveBeenCalledWith({
        comment: 'dehboard comment',
        dashboardId: '1',
        userId: '1',
      });
    });
  });
  describe('dashboard', () => {
    it('should create a dashboard', async () => {
      const spyCreate = jest.spyOn(createDashboardUseCase, 'execute');

      const result = await service.create(createDashboardFixture);

      expect(result).toStrictEqual(findOneDashboardsResponseFixture);

      expect(spyCreate).toHaveBeenCalledTimes(1);
      expect(spyCreate).toHaveBeenCalledWith(createDashboardFixture);
    });

    it('should list all dashboards', async () => {
      const spyListDashboards = jest.spyOn(listDashboardUseCase, 'execute');

      const filters: PageableQueryRequest = {
        page: 1,
        pageSize: 10,
      };

      const result = await service.findAll(filters);

      expect(result).toStrictEqual(findAllDashboardsResponseFixture);

      expect(spyListDashboards).toHaveBeenCalledTimes(1);
      expect(spyListDashboards).toHaveBeenCalledWith(filters);
    });

    it('should find one dashboard', async () => {
      const spyGetDashboard = jest.spyOn(getDashboardUseCase, 'execute');

      const dashboardId = '1';

      const result = await service.findOne(dashboardId);

      expect(result).toStrictEqual(findOneDashboardsResponseFixture);

      expect(spyGetDashboard).toHaveBeenCalledTimes(1);
      expect(spyGetDashboard).toHaveBeenCalledWith(dashboardId);
    });

    it('should update one dashboard', async () => {
      const spyUpdateDashboard = jest.spyOn(updateDashboardUseCase, 'execute');

      const dashboardId = '1';

      const updateDashboard: UpdateDashboardDto = {
        name: 'new name',
      };

      const result = await service.update(dashboardId, updateDashboard);

      expect(result).toStrictEqual(findOneDashboardsResponseFixture);

      expect(spyUpdateDashboard).toHaveBeenCalledTimes(1);
      expect(spyUpdateDashboard).toHaveBeenCalledWith({
        id: '1',
        name: 'new name',
      });
    });

    it('should remove one dashboard', async () => {
      const spyDeleteDashboard = jest.spyOn(deleteDashboardUseCase, 'execute');

      const dashboardId = '1';

      await service.remove(dashboardId);

      expect(spyDeleteDashboard).toHaveBeenCalledTimes(1);
      expect(spyDeleteDashboard).toHaveBeenCalledWith(dashboardId);
    });
  });
});
