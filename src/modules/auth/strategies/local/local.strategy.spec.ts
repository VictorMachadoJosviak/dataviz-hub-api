import { Test } from '@nestjs/testing';
import { UserResponseDto } from '../../../users/dtos/response/user-response.dto';
import { AuthService } from '../../services/auth/auth.service';
import { LocalStrategy } from './local.strategy';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should validate and return user', async () => {
    const user: UserResponseDto = {
      email: 'test@test.com',
      name: 'Test',
      id: '1',
    };
    const password = '123';
    const spyAuthService = jest
      .spyOn(authService, 'validateUser')
      .mockResolvedValue(user);

    const result = await strategy.validate(user.email, password);

    expect(result).toEqual(user);
    expect(spyAuthService).toHaveBeenCalledTimes(1);
    expect(spyAuthService).toHaveBeenCalledWith(user.email, password);
  });
});
