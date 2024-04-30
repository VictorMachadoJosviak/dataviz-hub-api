import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { IUseCase } from '../../../../common/use-case/use-case';
import { CreateDashboardDto } from '../../dto/request/create-dashboard/create-dashboard.dto';
import { DashboardDto } from '../../dto/response/dashboard/dashboard.dto';
import { DashboardArea } from '../../entities/dashboard-area.entity';
import { Dashboard } from '../../entities/dashboard.entity';

export type ICreateDashboardUseCase = IUseCase<
  CreateDashboardDto,
  DashboardDto
>;

export const CREATE_DASHBOARD_USE_CASE = 'ICreateDashboardUseCase';

@Injectable()
export class CreateDashboardUseCase implements ICreateDashboardUseCase {
  constructor(
    @InjectRepository(Dashboard)
    private readonly dashboardRepository: EntityRepository<Dashboard>,
  ) {}

  async execute(request: CreateDashboardDto): Promise<DashboardDto> {
    const dashboard = await this.dashboardRepository
      .getEntityManager()
      .transactional(async (em) => {
        const dashboard = em.create(Dashboard, {
          area: em.create(DashboardArea, {
            name: request.area.name,
          }),
          description: request.description,
          isResponsive: request.isResponsive,
          linkDesktop: request.linkDesktop,
          linkMobile: request.linkMobile,
          metrics: request.metrics.map((metric) => ({
            name: metric.name,
            calculus: metric.calculus,
            description: metric.description,
            polarity: metric.polarity,
          })),
          name: request.name,
          origins: request.origins.map((origin) => ({
            name: origin.name,
            description: origin.description,
          })),
          responsibles: request.responsibles.map((responsible) => ({
            name: responsible.name,
            email: responsible.email,
          })),
          campaign: request.campaign,
          technology: request.technology,
          updateFrequency: request.updateFrequency,
          usabilityWarning: request.usabilityWarning,
        });

        await em.persistAndFlush(dashboard);

        return dashboard;
      });

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
      responsibles: dashboard.responsibles.map((responsible) => ({
        id: responsible.id,
        name: responsible.name,
        email: responsible.email,
      })),
      campaign: dashboard.campaign,
      area: {
        id: dashboard.area.id,
        name: dashboard.area.name,
      },
    };
  }
}
