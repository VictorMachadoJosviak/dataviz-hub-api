import { PartialType } from '@nestjs/swagger';
import { DashboardDto } from '../../response/dashboard/dashboard.dto';

export class UpdateDashboardDto extends PartialType(DashboardDto) {}
