import { ApiProperty } from '@nestjs/swagger';

export class DashboardAreaDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
