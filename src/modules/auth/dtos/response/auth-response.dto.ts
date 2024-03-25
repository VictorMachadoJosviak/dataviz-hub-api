import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({
    description: 'The token expiration time in seconds',
  })
  expiresIn: number;
}
