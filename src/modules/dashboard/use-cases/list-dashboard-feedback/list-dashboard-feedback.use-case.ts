import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import {
  PageableQueryRequest,
  PageableQueryResponse,
  calculatePagination,
} from '../../../../common/pagination/pagination';
import { IUseCase } from '../../../../common/use-case/use-case';
import { DashboardFeedbackResponseDto } from '../../dto/response/dashboard-feedback/dashboard-feedback.dto';
import { DashboardFeedback } from '../../entities/dashboard-feedback';

type ListDashboardFeedback = {
  dashboardId: string;
} & PageableQueryRequest;

export type IListDashboardFeedbackUseCase = IUseCase<
  ListDashboardFeedback,
  PageableQueryResponse<DashboardFeedbackResponseDto>
>;

export const LIST_DASHBOARD_FEEDBACK_USE_CASE = 'IListDashboardFeedbackUseCase';

@Injectable()
export class ListDashboardFeedbackUseCase
  implements IListDashboardFeedbackUseCase
{
  constructor(
    @InjectRepository(DashboardFeedback)
    private readonly dashboardFeedbackRepository: EntityRepository<DashboardFeedback>,
  ) {}

  async execute(
    request: ListDashboardFeedback,
  ): Promise<PageableQueryResponse<DashboardFeedbackResponseDto>> {
    const { offset } = calculatePagination(request.page, request.pageSize);

    const [data, total] = await this.dashboardFeedbackRepository.findAndCount(
      {
        dashboard: {
          id: request.dashboardId,
        },
      },
      {
        offset,
        limit: request.pageSize,
        populate: ['user'],
      },
    );

    return {
      total,
      data: data.map<DashboardFeedbackResponseDto>((feedback) => ({
        id: feedback.id,
        comment: feedback.comment,
        user: {
          id: feedback.user.id,
          name: feedback.user.name,
          email: feedback.user.email,
        },
        createdAt: feedback.createdAt,
      })),
    };
  }
}
