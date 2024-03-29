import { Injectable } from '@nestjs/common';
import { IUseCase } from '../../../../common/use-case/use-case';
import { CreateDashboardDto } from '../../dto/request/create-dashboard/create-dashboard.dto';

export type ICreateDashboardUseCase = IUseCase<CreateDashboardDto, string>;

export const CREATE_DASHBOARD_USE_CASE = 'ICreateDashboardUseCase';

@Injectable()
export class CreateDashboardUseCase implements ICreateDashboardUseCase {
  async execute(request: CreateDashboardDto): Promise<string> {
    return 'dashboard criado com sucesso!!!';
  }
}
