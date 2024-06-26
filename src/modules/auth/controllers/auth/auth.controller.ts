import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../../../users/dtos/request/create-user.dto';
import { UserResponseDto } from '../../../users/dtos/response/user-response.dto';
import { Public } from '../../decorators/public/public';
import { AuthRequestDto } from '../../dtos/request/auth-request.dto';
import { AuthResponseDto } from '../../dtos/response/auth-response.dto';
import { AuthService } from '../../services/auth/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description: `property "expiresIn" seconds`,
  })
  @ApiResponse({ type: AuthResponseDto })
  async login(@Body() user: AuthRequestDto) {
    return this.authService.login(user);
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get profile',
  })
  @ApiResponse({ type: UserResponseDto })
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.id);
  }

  @Public()
  @ApiResponse({ type: UserResponseDto, status: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @ApiOperation({
    summary: 'Create a new account',
  })
  register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
}
