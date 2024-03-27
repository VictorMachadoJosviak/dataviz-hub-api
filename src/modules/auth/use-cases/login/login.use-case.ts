import { Injectable, UnauthorizedException } from '@nestjs/common';

import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import * as bcrypt from 'bcrypt';
import { IUseCase } from '../../../../common/use-case/use-case';
import { UserResponseDto } from '../../../users/dtos/response/user-response.dto';
import { User } from '../../../users/entities/user.entity';
import { AuthRequestDto } from '../../dtos/request/auth-request.dto';

export const LOGIN_USE_CASE = 'ILoginUseCase';

export type ILoginUseCase = IUseCase<
  AuthRequestDto,
  UserResponseDto | undefined
>;

@Injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async execute(request: AuthRequestDto): Promise<UserResponseDto | undefined> {
    const user = await this.userRepository.findOne({ email: request.email });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassowrd = await bcrypt.compare(
      request.password,
      user.password,
    );

    if (!isValidPassowrd) {
      throw new UnauthorizedException();
    }

    return user.toDto();
  }
}
