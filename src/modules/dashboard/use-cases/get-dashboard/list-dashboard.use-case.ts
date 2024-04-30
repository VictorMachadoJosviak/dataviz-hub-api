import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../../../common/use-case/use-case';
import { DashboardDto } from '../../dto/response/dashboard/dashboard.dto';
import { Dashboard } from '../../entities/dashboard.entity';

export type IGetDashboardUseCase = IUseCase<string, DashboardDto>;

export const GET_DASHBOARD_USE_CASE = 'IGetDashboardUseCase';

@Injectable()
export class GetDashboardUseCase implements IGetDashboardUseCase {
  constructor(
    @InjectRepository(Dashboard)
    private readonly dashboardRepository: EntityRepository<Dashboard>,
  ) {}

  async execute(id: string): Promise<DashboardDto> {
    try {
      const dashboard = await this.dashboardRepository.findOneOrFail(
        { id },
        { populate: ['*'] },
      );

      return {
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
        campaign: dashboard.campaign,
        responsibles: dashboard.responsibles.map((responsible) => ({
          id: responsible.id,
          name: responsible.name,
          email: responsible.email,
        })),
        area: {
          id: dashboard.area.id,
          name: dashboard.area.name,
        },
      };
    } catch (error) {
      throw new NotFoundException('Dashboard not found');
    }
  }
}
