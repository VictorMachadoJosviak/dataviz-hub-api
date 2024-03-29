import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import {
  PageableQueryRequest,
  PageableQueryResponse,
  calculatePagination,
} from '../../../../common/pagination/pagination';
import { IUseCase } from '../../../../common/use-case/use-case';
import { DashboardDto } from '../../dto/response/dashboard/dashboard.dto';
import { Dashboard } from '../../entities/dashboard.entity';

export type IListDashboardsUseCase = IUseCase<
  PageableQueryRequest,
  PageableQueryResponse<DashboardDto>
>;

export const LIST_DASHBOARD_USE_CASE = 'IListDashboardsUseCase';

@Injectable()
export class ListDashboardsUseCase implements IListDashboardsUseCase {
  constructor(
    @InjectRepository(Dashboard)
    private readonly dashboardRepository: EntityRepository<Dashboard>,
  ) {}

  async execute(
    filters?: PageableQueryRequest,
  ): Promise<PageableQueryResponse<DashboardDto>> {
    const { limit, offset } = calculatePagination(
      filters.page,
      filters.pageSize,
    );

    const [data, total] = await this.dashboardRepository.findAndCount(
      {},
      {
        offset,
        limit,
        populate: ['*'],
      },
    );

    return {
      total,
      data: data.map<DashboardDto>((dashboard) => ({
        id: dashboard.id,
        name: dashboard.name,
        technology: dashboard.technology,
        description: dashboard.description,
        linkDesktop: dashboard.linkDesktop,
        linkMobile: dashboard.linkMobile,
        isResponsive: dashboard.isResponsive,
        updateFrequency: dashboard.updateFrequency,
        usabilityWarning: dashboard.usabilityWarning,
        metrics: dashboard.metrics.map((metric) => ({
          id: metric.id,
          name: metric.name,
          calculus: metric.calculus,
          description: metric.description,
          polarity: metric.polarity,
        })),
        origins: dashboard.origins.map((origin) => ({
          id: origin.id,
          name: origin.name,
          description: origin.description,
        })),
        responsibles: dashboard.responsibles.map((responsible) => ({
          id: responsible.id,
          name: responsible.name,
          email: responsible.email,
        })),
        area: {
          id: dashboard.area.id,
          name: dashboard.area.name,
        },
      })),
    };
  }
}
