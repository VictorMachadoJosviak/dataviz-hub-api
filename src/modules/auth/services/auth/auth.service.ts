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
import {
  ILoginUseCase,
  LOGIN_USE_CASE,
} from '../../use-cases/login/login.use-case';

@Injectable()
export class AuthService {
  constructor(
    @Inject(LOGIN_USE_CASE)
    private loginUserUseCase: ILoginUseCase,
    private jwtService: JwtService,
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserUseCase: ICreateUserUseCase,
    @Inject(FIND_USER_USE_CASE)
    private readonly findUserUseCase: IFindUserUseCase,
  ) {}

  validateUser(email: string, password: string): Promise<UserResponseDto> {
    return this.loginUserUseCase.execute({ email, password });
  }

  async login(req: AuthRequestDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(req.email, req.password);
    const payload = { email: user.email, sub: user.id, name: user.name };

    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: jwtConstants.expiresInSeconds,
    };
  }

  register(req: CreateUserDto): Promise<UserResponseDto> {
    return this.createUserUseCase.execute(req);
  }

  getProfile(userId: string): Promise<UserResponseDto> {
    return this.findUserUseCase.execute(userId);
  }
}
