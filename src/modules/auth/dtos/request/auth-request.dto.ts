import { ApiProperty } from '@nestjs/swagger';

export class AuthRequestDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
