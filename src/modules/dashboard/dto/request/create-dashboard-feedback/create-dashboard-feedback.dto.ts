import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDashboardFeedbackDto {
  @ApiProperty()
  @IsString()
  comment: string;
}
