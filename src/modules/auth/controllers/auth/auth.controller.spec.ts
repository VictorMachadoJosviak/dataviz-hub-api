import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../../../users/dtos/request/create-user.dto';
import { UserResponseDto } from '../../../users/dtos/response/user-response.dto';
import { AuthRequestDto } from '../../dtos/request/auth-request.dto';
import { AuthResponseDto } from '../../dtos/response/auth-response.dto';
import { AuthService } from '../../services/auth/auth.service';
import { AuthController } from './auth.controller';

const mockToken: AuthResponseDto = {
  accessToken: 'token',
  expiresIn: 3600,
};

const mockUserResponse: UserResponseDto = {
  email: 'email@test.com',
  id: '123',
  name: 'Test',
};

const mockAuthService = {
  login: jest.fn().mockResolvedValue(mockToken),
  getProfile: jest.fn().mockResolvedValue(mockUserResponse),
  register: jest.fn().mockResolvedValue(mockUserResponse),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return an object with a token', async () => {
      const request: AuthRequestDto = {
        email: 'email@example.com',
        password: 'password',
      };

      const result = await controller.login(request);

      expect(result).toStrictEqual(mockToken);

      expect(mockAuthService.login).toHaveBeenCalledTimes(1);
      expect(mockAuthService.login).toHaveBeenCalledWith(request);
    });
  });

  describe('getProfile', () => {
    it('should return a user profile', async () => {
      const request = { user: { id: mockUserResponse.id } };

      const result = await controller.getProfile(request);

      expect(result).toStrictEqual(mockUserResponse);
      expect(mockAuthService.getProfile).toHaveBeenCalledTimes(1);
      expect(mockAuthService.getProfile).toHaveBeenCalledWith(request.user.id);
    });
  });

  describe('register', () => {
    it('should register a user', async () => {
      const request: CreateUserDto = {
        email: 'email@email.com',
        name: 'Test',
        password: 'password',
      };

      const result = await controller.register(request);

      expect(result).toStrictEqual(mockUserResponse);

      expect(mockAuthService.register).toHaveBeenCalledTimes(1);
      expect(mockAuthService.register).toHaveBeenCalledWith(request);
    });
  });
});
