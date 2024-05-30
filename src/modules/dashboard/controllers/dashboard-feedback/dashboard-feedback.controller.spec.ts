import { REQUEST } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { PageableQueryRequest } from '../../../../common/pagination/pagination.dto';
import { createDashboardFeedbackFixture } from '../../fixtures/create-dashboard-feedback.fixture';
import { listDashboardFeedbacksResponseFixture } from '../../fixtures/list-all-dashboard-feedbacks.fixture';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardFeedbackController } from './dashboard-feedback.controller';

const mockDashboardService = {
  createFeedback: jest.fn().mockResolvedValue({}),
  listFeedbacks: jest
    .fn()
    .mockResolvedValue(listDashboardFeedbacksResponseFixture),
  deleteFeedback: jest.fn().mockResolvedValue(undefined),
};

const mockCurrentUser = {
  id: '1',
  email: 'email',
  name: 'name',
};

describe('DashboardFeedbackController', () => {
  let controller: DashboardFeedbackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardFeedbackController],
      providers: [
        {
          provide: DashboardService,
          useValue: mockDashboardService,
        },
      ],
    })
      .overrideProvider(REQUEST)
      .useValue({
        user: mockCurrentUser,
      })
      .compile();

    controller = module.get<DashboardFeedbackController>(
      DashboardFeedbackController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create feedback', () => {
    it('should create a new dashboard feedback', async () => {
      const spyCreateFeedback = jest.spyOn(
        mockDashboardService,
        'createFeedback',
      );

      const dashboardId = '1';

      await controller.createFeeback(
        dashboardId,
        createDashboardFeedbackFixture,
      );

      expect(spyCreateFeedback).toHaveBeenCalledTimes(1);
      expect(spyCreateFeedback).toHaveBeenCalledWith(
        dashboardId,
        mockCurrentUser.id,
        createDashboardFeedbackFixture,
      );
    });
  });

  describe('list feedbacks', () => {
    it('should list dashboard feedbacks', async () => {
      const spyListFeedbacks = jest.spyOn(
        mockDashboardService,
        'listFeedbacks',
      );

      const dashboardId = '1';
      const filters: PageableQueryRequest = {
        page: 1,
        pageSize: 10,
      };

      await controller.listFeedbacks(dashboardId, filters);

      expect(spyListFeedbacks).toHaveBeenCalledTimes(1);
      expect(spyListFeedbacks).toHaveBeenCalledWith(dashboardId, filters);
    });
  });

  describe('remove feedback', () => {
    it('should delete one dashboard feedbac', async () => {
      const spyDeleteFeedbacks = jest.spyOn(
        mockDashboardService,
        'deleteFeedback',
      );

      const feedbackId = '1';

      await controller.deleteFeedback(feedbackId);

      expect(spyDeleteFeedbacks).toHaveBeenCalledTimes(1);
      expect(spyDeleteFeedbacks).toHaveBeenCalledWith(feedbackId);
    });
  });
});
