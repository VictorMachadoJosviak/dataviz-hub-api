import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { UserResponseDto } from '../../../users/dtos/response/user-response.dto';
import { AuthRequestDto } from '../../dtos/request/auth-request.dto';

import { CreateUserDto } from '../../../users/dtos/request/create-user.dto';
import {
  CREATE_USER_USE_CASE,
  ICreateUserUseCase,
} from '../../../users/use-cases/create-user/create-user.use-case';
import {
  FIND_USER_USE_CASE,
  IFindUserUseCase,
} from '../../../users/use-cases/find-user/find-user.use-case';
import {
  ILoginUseCase,
  LOGIN_USE_CASE,
} from '../../use-cases/login/login.use-case';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let loginUserUseCase: ILoginUseCase;
  let createUserUseCase: ICreateUserUseCase;
  let findUserUseCase: IFindUserUseCase;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
        {
          provide: LOGIN_USE_CASE,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: CREATE_USER_USE_CASE,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FIND_USER_USE_CASE,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    loginUserUseCase = module.get<ILoginUseCase>(LOGIN_USE_CASE);
    createUserUseCase = module.get<ICreateUserUseCase>(CREATE_USER_USE_CASE);
    findUserUseCase = module.get<IFindUserUseCase>(FIND_USER_USE_CASE);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should validate user', async () => {
    const input: AuthRequestDto = {
      email: 'test@test.com',
      password: 'password',
    };

    const user: UserResponseDto = {
      email: input.email,
      name: 'Test',
      id: '1',
    };

    const spyLoginUseCase = jest
      .spyOn(loginUserUseCase, 'execute')
      .mockResolvedValue(user);

    const result = await service.validateUser(input.email, input.password);

    expect(result).toStrictEqual(user);
    expect(spyLoginUseCase).toHaveBeenCalledTimes(1);
    expect(spyLoginUseCase).toHaveBeenCalledWith(input);
  });

  it('should return access token after validate user', async () => {
    const input: AuthRequestDto = {
      email: 'test@test.com',
      password: 'password',
    };

    const user: UserResponseDto = {
      email: input.email,
      name: 'Test',
      id: '1',
    };

    const spyLoginUseCase = jest
      .spyOn(loginUserUseCase, 'execute')
      .mockResolvedValue(user);

    const spySign = jest.spyOn(jwtService, 'sign');

    const result = await service.login(input);

    expect(result).toStrictEqual({
      accessToken: 'token',
      expiresIn: 3600,
    });

    expect(spyLoginUseCase).toHaveBeenCalledTimes(1);
    expect(spyLoginUseCase).toHaveBeenCalledWith(input);
    expect(spySign).toHaveBeenCalledTimes(1);
    expect(spySign).toHaveBeenCalledWith({
      email: 'test@test.com',
      name: 'Test',
      sub: '1',
    });
  });

  it('should register user', async () => {
    const req: CreateUserDto = {
      email: 'email',
      name: 'name',
      password: 'password',
    };

    const user: UserResponseDto = {
      email: req.email,
      name: req.name,
      id: '1',
    };

    const spyCreateUserUseCase = jest
      .spyOn(createUserUseCase, 'execute')
      .mockResolvedValue(user);

    const result = await service.register(req);

    expect(result).toStrictEqual(user);
    expect(spyCreateUserUseCase).toHaveBeenCalledTimes(1);
    expect(spyCreateUserUseCase).toHaveBeenCalledWith(req);
  });

  it('should get user profile', async () => {
    const user: UserResponseDto = {
      email: 'email',
      name: 'name',
      id: '1',
    };

    const spyFindUserUseCase = jest
      .spyOn(findUserUseCase, 'execute')
      .mockResolvedValue(user);

    const result = await service.getProfile(user.id);

    expect(result).toStrictEqual(user);
    expect(spyFindUserUseCase).toHaveBeenCalledTimes(1);
    expect(spyFindUserUseCase).toHaveBeenCalledWith(user.id);
  });
});
