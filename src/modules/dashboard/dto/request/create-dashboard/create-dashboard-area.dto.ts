import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDashboardAreaDto {
  @ApiProperty()
  @IsString()
  name: string;
}
