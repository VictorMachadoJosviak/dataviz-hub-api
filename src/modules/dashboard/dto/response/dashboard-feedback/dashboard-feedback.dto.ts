import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../../../users/dtos/response/user-response.dto';

export class DashboardFeedbackResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  user: UserResponseDto;

  @ApiProperty()
  createdAt: Date;
}
