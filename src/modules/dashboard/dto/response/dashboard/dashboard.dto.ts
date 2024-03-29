import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DashboardFrequencyUpdate } from '../../../enums/dashboard-frequency-update.enum';
import { DashboardTechnology } from '../../../enums/dashboard-technology.enum';
import { DashboardAreaDto } from './dashboard-area.dto';
import { DashboardMetricDto } from './dashboard-metric.dto';
import { DashboardOriginDto } from './dashboard-origin.dto';
import { CreateDashboardResponsibleDto } from './dashboard-responsible.dto';

export class DashboardDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({
    enum: DashboardTechnology,
  })
  technology: DashboardTechnology;

  @ApiProperty()
  description: string;

  @ApiProperty()
  linkDesktop: string;

  @ApiProperty()
  linkMobile: string;

  @ApiProperty()
  isResponsive: boolean;

  @ApiProperty({
    type: () => DashboardMetricDto,
    isArray: true,
  })
  @Type(() => DashboardMetricDto)
  metrics: DashboardMetricDto[];

  @ApiProperty({
    type: () => DashboardOriginDto,
    isArray: true,
  })
  @Type(() => DashboardOriginDto)
  origins: DashboardOriginDto[];

  @ApiProperty({
    type: () => CreateDashboardResponsibleDto,
    isArray: true,
  })
  @Type(() => CreateDashboardResponsibleDto)
  responsibles: CreateDashboardResponsibleDto[];

  @ApiProperty({
    type: () => DashboardAreaDto,
  })
  @Type(() => DashboardAreaDto)
  area: DashboardAreaDto;

  @ApiProperty({
    enum: DashboardFrequencyUpdate,
  })
  updateFrequency: DashboardFrequencyUpdate;

  @ApiProperty()
  usabilityWarning: string;
}
