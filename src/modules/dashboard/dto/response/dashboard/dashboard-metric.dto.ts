import { ApiProperty } from '@nestjs/swagger';
import { DashboardPolarity } from '../../../enums/dashboard-polarity.enum';

export class DashboardMetricDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  calculus: string;

  @ApiProperty({
    enum: DashboardPolarity,
  })
  polarity: DashboardPolarity;

  @ApiProperty()
  description: string;
}
