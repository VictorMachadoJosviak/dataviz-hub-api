import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { DashboardController } from './controllers/dashboard/dashboard.controller';
import { DashboardArea } from './entities/dashboard-area.entity';
import { DashboardMetric } from './entities/dashboard-metric.entity';
import { DashboardOrigin } from './entities/dashboard-origin.entity';
import { DashboardResponsible } from './entities/dashboard-responsibles.entity';
import { Dashboard } from './entities/dashboard.entity';
import { DashboardService } from './services/dashboard.service';

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
  providers: [DashboardService],
})
export class DashboardModule {}
