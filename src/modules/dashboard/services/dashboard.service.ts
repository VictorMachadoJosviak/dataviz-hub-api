import { Inject, Injectable } from '@nestjs/common';
import { PageableQueryRequest } from '../../../common/pagination/pagination';
import { CreateDashboardFeedbackDto } from '../dto/request/create-dashboard-feedback/create-dashboard-feedback.dto';
import { CreateDashboardDto } from '../dto/request/create-dashboard/create-dashboard.dto';
import { UpdateDashboardDto } from '../dto/request/update-dashboard/update-dashboard.dto';
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

@Injectable()
export class DashboardService {
  constructor(
    @Inject(CREATE_DASHBOARD_USE_CASE)
    private readonly createDashboardUseCase: ICreateDashboardUseCase,
    @Inject(LIST_DASHBOARD_USE_CASE)
    private readonly listDashboardUseCase: IListDashboardsUseCase,
    @Inject(GET_DASHBOARD_USE_CASE)
    private readonly getDashboardUseCase: IGetDashboardUseCase,
    @Inject(UPDATE_DASHBOARD_USE_CASE)
    private readonly updateDashboardUseCase: IUpdateDashboardUseCase,
    @Inject(DELETE_DASHBOARD_USE_CASE)
    private readonly deleteDashboardUseCase: IDeleteDashboardUseCase,
    @Inject(CREATE_DASHBOARD_FEEDBACK_USE_CASE)
    private readonly createDashboardFeedbackUseCase: ICreateDashboardFeedbackUseCase,
    @Inject(LIST_DASHBOARD_FEEDBACK_USE_CASE)
    private readonly listDashboardFeedbackUseCase: IListDashboardFeedbackUseCase,
    @Inject(DELETE_DASHBOARD_FEEDBACK_USE_CASE)
    private readonly deleteDashboardFeedbackUseCase: IDeleteDashboardFeedbackUseCase,
  ) {}

  deleteFeedback(feedbackId: string) {
    return this.deleteDashboardFeedbackUseCase.execute(feedbackId);
  }

  listFeedbacks(dashboardId: string, filters: PageableQueryRequest) {
    return this.listDashboardFeedbackUseCase.execute({
      dashboardId,
      page: filters.page,
      pageSize: filters.pageSize,
    });
  }

  createFeedback(
    dashboardId: string,
    userId: string,
    feedback: CreateDashboardFeedbackDto,
  ) {
    return this.createDashboardFeedbackUseCase.execute({
      dashboardId,
      userId,
      comment: feedback.comment,
    });
  }

  create(createDashboardDto: CreateDashboardDto) {
    return this.createDashboardUseCase.execute(createDashboardDto);
  }

  findAll(filters: PageableQueryRequest) {
    return this.listDashboardUseCase.execute(filters);
  }

  findOne(id: string) {
    return this.getDashboardUseCase.execute(id);
  }

  update(id: string, updateDashboardDto: UpdateDashboardDto) {
    return this.updateDashboardUseCase.execute({ ...updateDashboardDto, id });
  }

  remove(id: string) {
    return this.deleteDashboardUseCase.execute(id);
  }
}
