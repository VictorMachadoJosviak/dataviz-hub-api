import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateDashboardResponsibleDto {
  @ApiProperty()
  @IsUUID()
  userId: string;
}
