import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../../../common/use-case/use-case';
import { User } from '../../../users/entities/user.entity';
import { CreateDashboardFeedbackDto } from '../../dto/request/create-dashboard-feedback/create-dashboard-feedback.dto';
import { DashboardFeedback } from '../../entities/dashboard-feedback';
import { Dashboard } from '../../entities/dashboard.entity';

type CreateDashboard = {
  dashboardId: string;
  userId: string;
} & CreateDashboardFeedbackDto;

export type ICreateDashboardFeedbackUseCase = IUseCase<CreateDashboard, void>;

export const CREATE_DASHBOARD_FEEDBACK_USE_CASE =
  'ICreateDashboardFeedbackUseCase';

@Injectable()
export class CreateDashboardFeedbackUseCase
  implements ICreateDashboardFeedbackUseCase
{
  constructor(
    @InjectRepository(Dashboard)
    private readonly dashboardRepository: EntityRepository<Dashboard>,
    @InjectRepository(DashboardFeedback)
    private readonly dashboardFeedbackRepository: EntityRepository<DashboardFeedback>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async execute(request: CreateDashboard): Promise<void> {
    const dashboard = await this.dashboardRepository.findOne({
      id: request.dashboardId,
    });

    if (!dashboard) {
      throw new NotFoundException('Dashboard not found');
    }

    const user = await this.userRepository.findOneOrFail(request.userId);

    const feedback = this.dashboardFeedbackRepository.create({
      comment: request.comment,
      dashboard,
      user,
    });

    await this.dashboardFeedbackRepository.insert(feedback);
  }
}
