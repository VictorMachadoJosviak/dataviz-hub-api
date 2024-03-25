import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorators/public/public';
import { AuthRequestDto } from '../../dtos/request/auth-request.dto';
import { AuthResponseDto } from '../../dtos/response/auth-response.dto';
import { AuthService } from '../../services/auth/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiResponse({ type: AuthResponseDto })
  async login(@Body() user: AuthRequestDto) {
    return this.authService.login(user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get()
  findAll() {
    return [];
  }
}
