import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../../../common/use-case/use-case';
import { UpdateDashboardDto } from '../../dto/request/update-dashboard/update-dashboard.dto';
import { DashboardDto } from '../../dto/response/dashboard/dashboard.dto';
import { DashboardMetric } from '../../entities/dashboard-metric.entity';
import { DashboardOrigin } from '../../entities/dashboard-origin.entity';
import { DashboardResponsible } from '../../entities/dashboard-responsibles.entity';
import { Dashboard } from '../../entities/dashboard.entity';

export type IUpdateDashboardUseCase = IUseCase<
  UpdateDashboardDto,
  DashboardDto
>;

export const UPDATE_DASHBOARD_USE_CASE = 'IUpdateDashboardUseCase';

@Injectable()
export class UpdateDashboardUseCase implements IUpdateDashboardUseCase {
  constructor(
    @InjectRepository(Dashboard)
    private readonly dashboardRepository: EntityRepository<Dashboard>,
  ) {}

  async execute(request: UpdateDashboardDto): Promise<DashboardDto> {
    const dashboard = await this.dashboardRepository
      .getEntityManager()
      .transactional(async (em) => {
        const dashboard = await em.findOne(Dashboard, request.id, {
          populate: ['area', 'metrics', 'origins', 'responsibles'],
        });

        if (!dashboard) {
          throw new NotFoundException("Dashboard doesn't exist.");
        }

        dashboard.name = request.name || dashboard.name;
        dashboard.technology = request.technology || dashboard.technology;
        dashboard.description = request.description || dashboard.description;
        dashboard.linkDesktop = request.linkDesktop || dashboard.linkDesktop;
        dashboard.linkMobile = request.linkMobile || dashboard.linkMobile;
        dashboard.isResponsive = request.isResponsive || dashboard.isResponsive;
        dashboard.updateFrequency =
          request.updateFrequency || dashboard.updateFrequency;
        dashboard.usabilityWarning =
          request.usabilityWarning || dashboard.usabilityWarning;

        if (request.area) {
          dashboard.area.name = request.area.name || dashboard.area.name;
        }

        if (request.metrics && request.metrics.length) {
          dashboard.metrics.removeAll();

          request.metrics.forEach((metric) => {
            dashboard.metrics.add(
              em.create(DashboardMetric, {
                name: metric.name,
                calculus: metric.calculus,
                description: metric.description,
                polarity: metric.polarity,
              }),
            );
          });
        }

        if (request.origins && request.origins.length) {
          dashboard.origins.removeAll();

          request.origins.forEach((origin) => {
            dashboard.origins.add(
              em.create(DashboardOrigin, {
                name: origin.name,
                description: origin.description,
              }),
            );
          });
        }

        if (request.responsibles && request.responsibles.length) {
          dashboard.responsibles.removeAll();

          request.responsibles.forEach((responsible) => {
            dashboard.responsibles.add(
              em.create(DashboardResponsible, {
                name: responsible.name,
                email: responsible.email,
              }),
            );
          });
        }

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
      area: {
        id: dashboard.area.id,
        name: dashboard.area.name,
      },
    };
  }
}
