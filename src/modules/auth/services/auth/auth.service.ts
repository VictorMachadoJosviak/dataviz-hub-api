import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../../users/dtos/request/create-user.dto';
import { UserResponseDto } from '../../../users/dtos/response/user-response.dto';
import { UsersService } from '../../../users/services/user/users.service';
import {
  CREATE_USER_USE_CASE,
  ICreateUserUseCase,
} from '../../../users/use-cases/create-user/create-user.use-case';
import { jwtConstants } from '../../constants/jwt';
import { AuthRequestDto } from '../../dtos/request/auth-request.dto';
import { AuthResponseDto } from '../../dtos/response/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserUseCase: ICreateUserUseCase,
  ) {}

  validateUser(username: string, pass: string): Promise<UserResponseDto> {
    return this.usersService.findOne(username, pass);
  }

  async login(req: AuthRequestDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(req.username, req.password);
    const payload = { username: user.username, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: jwtConstants.expiresInSeconds,
    };
  }

  async register(req: CreateUserDto): Promise<UserResponseDto> {
    return this.createUserUseCase.execute(req);
  }
}
