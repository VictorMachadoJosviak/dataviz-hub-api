import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, Provider } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { DashboardFeedbackController } from './controllers/dashboard-feedback/dashboard-feedback.controller';
import { DashboardController } from './controllers/dashboard/dashboard.controller';
import { DashboardArea } from './entities/dashboard-area.entity';
import { DashboardFeedback } from './entities/dashboard-feedback';
import { DashboardMetric } from './entities/dashboard-metric.entity';
import { DashboardOrigin } from './entities/dashboard-origin.entity';
import { DashboardResponsible } from './entities/dashboard-responsibles.entity';
import { Dashboard } from './entities/dashboard.entity';
import { DashboardService } from './services/dashboard.service';
import {
  CREATE_DASHBOARD_FEEDBACK_USE_CASE,
  CreateDashboardFeedbackUseCase,
} from './use-cases/create-dashboard-feedback/create-dashboard-feedback.use-case';
import {
  CREATE_DASHBOARD_USE_CASE,
  CreateDashboardUseCase,
} from './use-cases/create-dashboard/create-dashboard.use-case';
import {
  DELETE_DASHBOARD_FEEDBACK_USE_CASE,
  DeleteDashboardFeedbackUseCase,
} from './use-cases/delete-dashboard-feedback/delete-dashboard-feedback.use-case';
import {
  DELETE_DASHBOARD_USE_CASE,
  DeleteDashboardUseCase,
} from './use-cases/delete-dashboard/delete-dashboard.use-case';
import {
  GET_DASHBOARD_USE_CASE,
  GetDashboardUseCase,
} from './use-cases/get-dashboard/list-dashboard.use-case';
import {
  LIST_DASHBOARD_FEEDBACK_USE_CASE,
  ListDashboardFeedbackUseCase,
} from './use-cases/list-dashboard-feedback/list-dashboard-feedback.use-case';
import {
  LIST_DASHBOARD_USE_CASE,
  ListDashboardsUseCase,
} from './use-cases/list-dashboards/list-dashboard.use-case';
import {
  UPDATE_DASHBOARD_USE_CASE,
  UpdateDashboardUseCase,
} from './use-cases/update-dashboard/update-dashboard.use-case';

const CreateDashboardUseCaseProvider: Provider = {
  provide: CREATE_DASHBOARD_USE_CASE,
  useClass: CreateDashboardUseCase,
};

const ListDashboardUseCaseProvider: Provider = {
  provide: LIST_DASHBOARD_USE_CASE,
  useClass: ListDashboardsUseCase,
};

const GetDashboardUseCaseProvider: Provider = {
  provide: GET_DASHBOARD_USE_CASE,
  useClass: GetDashboardUseCase,
};

const UpdateDashboardUseCaseProvider: Provider = {
  provide: UPDATE_DASHBOARD_USE_CASE,
  useClass: UpdateDashboardUseCase,
};

const DeleteDashboardUseCaseProvider: Provider = {
  provide: DELETE_DASHBOARD_USE_CASE,
  useClass: DeleteDashboardUseCase,
};

const CreateDashboardFeedbackUseCaseProvider: Provider = {
  provide: CREATE_DASHBOARD_FEEDBACK_USE_CASE,
  useClass: CreateDashboardFeedbackUseCase,
};
const ListDashboardFeedbackUseCaseProvider: Provider = {
  provide: LIST_DASHBOARD_FEEDBACK_USE_CASE,
  useClass: ListDashboardFeedbackUseCase,
};
const DeleteDashboardFeedbackUseCaseProvider: Provider = {
  provide: DELETE_DASHBOARD_FEEDBACK_USE_CASE,
  useClass: DeleteDashboardFeedbackUseCase,
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
      DashboardFeedback,
    ]),
  ],
  controllers: [DashboardController, DashboardFeedbackController],
  providers: [
    DashboardService,
    CreateDashboardUseCaseProvider,
    ListDashboardUseCaseProvider,
    GetDashboardUseCaseProvider,
    UpdateDashboardUseCaseProvider,
    DeleteDashboardUseCaseProvider,
    CreateDashboardFeedbackUseCaseProvider,
    ListDashboardFeedbackUseCaseProvider,
    DeleteDashboardFeedbackUseCaseProvider,
  ],
})
export class DashboardModule {}
