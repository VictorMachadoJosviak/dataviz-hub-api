import { getRepositoryToken } from '@mikro-orm/nestjs';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { User } from '../../../users/entities/user.entity';
import { AuthRequestDto } from '../../dtos/request/auth-request.dto';
import { LoginUseCase } from './login.use-case';

const mockUserEntity = new User({
  id: '1',
  email: 'test@test.com',
  name: 'Test',
  password: 'password',
});

describe('UsersService', () => {
  let useCase: LoginUseCase;

  let userRepository = {
    findOne: jest.fn().mockResolvedValue(mockUserEntity),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
      ],
    }).compile();

    useCase = module.get<LoginUseCase>(LoginUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user when authentication is success', async () => {
    const spyCompare = jest
      .spyOn(bcrypt, 'compare')
      .mockImplementationOnce(() => true);

    const request: AuthRequestDto = {
      email: mockUserEntity.email,
      password: mockUserEntity.password,
    };

    const result = await useCase.execute(request);

    expect(result).toStrictEqual({
      id: mockUserEntity.id,
      name: mockUserEntity.name,
      email: mockUserEntity.email,
    });

    expect(spyCompare).toHaveBeenCalledTimes(1);
    expect(spyCompare).toHaveBeenCalledWith(
      request.password,
      mockUserEntity.password,
    );
  });

  it('should throw UnauthorizedException if password not matches', async () => {
    const spyCompare = jest
      .spyOn(bcrypt, 'compare')
      .mockImplementationOnce(() => false);

    const result = useCase.execute({
      email: mockUserEntity.email,
      password: 'wrong-password',
    });

    await expect(result).rejects.toThrow(
      new UnauthorizedException('Unauthorized'),
    );
    expect(spyCompare).toHaveBeenCalledTimes(1);
    expect(spyCompare).toHaveBeenCalledWith(
      'wrong-password',
      mockUserEntity.password,
    );
  });

  it('should throw UnauthorizedException if user not found', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

    const result = useCase.execute(new AuthRequestDto());

    await expect(result).rejects.toThrow(
      new UnauthorizedException('Unauthorized'),
    );
  });
});
