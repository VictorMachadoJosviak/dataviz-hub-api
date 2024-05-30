import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let reflector: Reflector;

  const mockFn = jest.fn();

  const spyGetHandler = jest.fn().mockReturnValue(mockFn);
  const spyGetClass = jest.fn().mockReturnValue(mockFn);

  const mockExecutionContext = {
    getHandler: spyGetHandler,
    getClass: spyGetClass,
  } as unknown as ExecutionContext;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow access if route is public', () => {
    const spyGetAllAndOverride = jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue(true);

    expect(guard.canActivate(mockExecutionContext)).toBe(true);

    expect(spyGetHandler).toHaveBeenCalledTimes(1);
    expect(spyGetClass).toHaveBeenCalledTimes(1);
    expect(spyGetAllAndOverride).toHaveBeenCalledTimes(1);
    expect(spyGetAllAndOverride).toHaveBeenCalledWith('isPublic', [
      mockFn,
      mockFn,
    ]);
  });

  it('should deny access if route is private', async () => {
    const spyGetAllAndOverride = jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue(false);

    const spyCanActivate = jest
      .spyOn(AuthGuard('jwt').prototype, 'canActivate')
      .mockImplementation(() => false);

    const result = await guard.canActivate(mockExecutionContext);

    expect(result).toBe(false);

    expect(spyGetHandler).toHaveBeenCalledTimes(1);
    expect(spyGetClass).toHaveBeenCalledTimes(1);
    expect(spyCanActivate).toHaveBeenCalledTimes(1);
    expect(spyCanActivate).toHaveBeenCalledWith(mockExecutionContext);
    expect(spyGetAllAndOverride).toHaveBeenCalledTimes(1);
    expect(spyGetAllAndOverride).toHaveBeenCalledWith('isPublic', [
      mockFn,
      mockFn,
    ]);
  });
});
