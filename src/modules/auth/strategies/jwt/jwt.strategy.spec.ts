import { Test } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should validate and return user', async () => {
    const user = { sub: '123456', username: 'test@test.com', name: 'Test' };
    const result = await strategy.validate(user);

    expect(result).toEqual({
      id: user.sub,
      email: user.username,
      name: user.name,
    });
  });
});
