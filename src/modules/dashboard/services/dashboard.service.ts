import { Inject, Injectable } from '@nestjs/common';
import { PageableQueryRequest } from '../../../common/pagination/pagination';
import { CreateDashboardDto } from '../dto/request/create-dashboard/create-dashboard.dto';
import { UpdateDashboardDto } from '../dto/request/update-dashboard.dto';
import {
  CREATE_DASHBOARD_USE_CASE,
  ICreateDashboardUseCase,
} from '../use-cases/create-dashboard/create-dashboard.use-case';
import {
  IListDashboardsUseCase,
  LIST_DASHBOARD_USE_CASE,
} from '../use-cases/list-dashboards/list-dashboard.use-case';

@Injectable()
export class DashboardService {
  constructor(
    @Inject(CREATE_DASHBOARD_USE_CASE)
    private readonly createDashboardUseCase: ICreateDashboardUseCase,
    @Inject(LIST_DASHBOARD_USE_CASE)
    private readonly listDashboardUseCase: IListDashboardsUseCase,
  ) {}

  create(createDashboardDto: CreateDashboardDto) {
    return this.createDashboardUseCase.execute(createDashboardDto);
  }

  findAll(filters: PageableQueryRequest) {
    return this.listDashboardUseCase.execute(filters);
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
