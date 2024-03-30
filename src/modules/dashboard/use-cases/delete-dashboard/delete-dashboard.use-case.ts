import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../../../common/use-case/use-case';
import { Dashboard } from '../../entities/dashboard.entity';

export type IDeleteDashboardUseCase = IUseCase<string, void>;

export const DELETE_DASHBOARD_USE_CASE = 'IDeleteDashboardUseCase';

@Injectable()
export class DeleteDashboardUseCase implements IDeleteDashboardUseCase {
  constructor(
    @InjectRepository(Dashboard)
    private readonly dashboardRepository: EntityRepository<Dashboard>,
  ) {}

  async execute(id: string): Promise<void> {
    await this.dashboardRepository
      .getEntityManager()
      .transactional(async (em) => {
        const dashboard = await em.findOne(Dashboard, id, {
          populate: ['*'],
        });

        if (!dashboard) {
          throw new NotFoundException('Dashboard not found');
        }

        await em.removeAndFlush(dashboard);
      });
  }
}
