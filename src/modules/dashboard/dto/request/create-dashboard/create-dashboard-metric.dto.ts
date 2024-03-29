import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { DashboardPolarity } from '../../../enums/dashboard-polarity.enum';

export class CreateDashboardMetricDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  calculus: string;

  @ApiProperty({
    enum: DashboardPolarity,
  })
  @IsEnum(DashboardPolarity)
  polarity: DashboardPolarity;

  @ApiProperty()
  @IsString()
  description: string;
}
