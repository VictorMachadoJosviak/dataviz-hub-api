import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../../../common/use-case/use-case';
import { DashboardFeedback } from '../../entities/dashboard-feedback';

export type IDeleteDashboardFeedbackUseCase = IUseCase<string, void>;

export const DELETE_DASHBOARD_FEEDBACK_USE_CASE =
  'IDeleteDashboardFeedbackUseCase';

@Injectable()
export class DeleteDashboardFeedbackUseCase
  implements IDeleteDashboardFeedbackUseCase
{
  constructor(
    @InjectRepository(DashboardFeedback)
    private readonly dashboardFeedbackRepository: EntityRepository<DashboardFeedback>,
  ) {}

  async execute(id: string): Promise<void> {
    const feedback = await this.dashboardFeedbackRepository.findOne(id);

    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }

    await this.dashboardFeedbackRepository.nativeDelete(feedback);
  }
}
