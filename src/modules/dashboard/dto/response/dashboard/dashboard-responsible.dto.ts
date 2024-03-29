import { ApiProperty } from '@nestjs/swagger';

export class CreateDashboardResponsibleDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}
