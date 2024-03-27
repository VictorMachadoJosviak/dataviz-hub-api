import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../../users/dtos/request/create-user.dto';
import { UserResponseDto } from '../../../users/dtos/response/user-response.dto';
import {
  CREATE_USER_USE_CASE,
  ICreateUserUseCase,
} from '../../../users/use-cases/create-user/create-user.use-case';
import {
  FIND_USER_USE_CASE,
  IFindUserUseCase,
} from '../../../users/use-cases/find-user/find-user.use-case';
import { jwtConstants } from '../../constants/jwt';
import { AuthRequestDto } from '../../dtos/request/auth-request.dto';
import { AuthResponseDto } from '../../dtos/response/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(FIND_USER_USE_CASE)
    private authenticateUserUseCase: IFindUserUseCase,
    private jwtService: JwtService,
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserUseCase: ICreateUserUseCase,
  ) {}

  validateUser(email: string, password: string): Promise<UserResponseDto> {
    return this.authenticateUserUseCase.execute({ email, password });
  }

  async login(req: AuthRequestDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(req.email, req.password);
    const payload = { username: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: jwtConstants.expiresInSeconds,
    };
  }

  async register(req: CreateUserDto): Promise<UserResponseDto> {
    return this.createUserUseCase.execute(req);
  }
}
