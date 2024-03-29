import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { DashboardFrequencyUpdate } from '../../../enums/dashboard-frequency-update.enum';
import { DashboardTechnology } from '../../../enums/dashboard-technology.enum';
import { CreateDashboardAreaDto } from './create-dashboard-area.dto';
import { CreateDashboardMetricDto } from './create-dashboard-metric.dto';
import { CreateDashboardOriginDto } from './create-dashboard-origin.dto';
import { CreateDashboardResponsibleDto } from './create-dashboard-responsible.dto';

export class CreateDashboardDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    enum: DashboardTechnology,
  })
  @IsEnum(DashboardTechnology)
  technology: DashboardTechnology;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsUrl()
  linkDesktop: string;

  @ApiProperty()
  @IsUrl()
  linkMobile: string;

  @ApiProperty()
  @IsBoolean()
  isResponsive: boolean;

  @ApiProperty({
    type: () => CreateDashboardMetricDto,
    isArray: true,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateDashboardMetricDto)
  metrics: CreateDashboardMetricDto[];

  @ApiProperty({
    type: () => CreateDashboardOriginDto,
    isArray: true,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateDashboardOriginDto)
  origin: CreateDashboardOriginDto[];

  @ApiProperty({
    type: () => CreateDashboardResponsibleDto,
    isArray: true,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateDashboardResponsibleDto)
  responsibles: CreateDashboardResponsibleDto[];

  @ApiProperty({
    type: () => CreateDashboardAreaDto,
  })
  @ValidateNested()
  @Type(() => CreateDashboardAreaDto)
  area: CreateDashboardAreaDto;

  @ApiProperty({
    enum: DashboardFrequencyUpdate,
  })
  @IsEnum(DashboardFrequencyUpdate)
  updateFrequency: DashboardFrequencyUpdate;

  @ApiProperty()
  @IsString()
  usabilityWarning: string;
}
