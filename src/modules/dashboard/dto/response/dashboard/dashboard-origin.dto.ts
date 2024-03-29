import { ApiProperty } from '@nestjs/swagger';

export class DashboardOriginDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
