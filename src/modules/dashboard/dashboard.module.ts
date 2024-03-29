import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, Provider } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { DashboardController } from './controllers/dashboard/dashboard.controller';
import { DashboardArea } from './entities/dashboard-area.entity';
import { DashboardMetric } from './entities/dashboard-metric.entity';
import { DashboardOrigin } from './entities/dashboard-origin.entity';
import { DashboardResponsible } from './entities/dashboard-responsibles.entity';
import { Dashboard } from './entities/dashboard.entity';
import { DashboardService } from './services/dashboard.service';
import {
  CREATE_DASHBOARD_USE_CASE,
  CreateDashboardUseCase,
} from './use-cases/create-dashboard/create-dashboard.use-case';

const CreateDashboardUseCaseProvider: Provider = {
  provide: CREATE_DASHBOARD_USE_CASE,
  useClass: CreateDashboardUseCase,
};

@Module({
  imports: [
    MikroOrmModule.forFeature([
      User,
      Dashboard,
      DashboardArea,
      DashboardMetric,
      DashboardOrigin,
      DashboardResponsible,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService, CreateDashboardUseCaseProvider],
})
export class DashboardModule {}
