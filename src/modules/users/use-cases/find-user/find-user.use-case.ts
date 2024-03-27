import { Injectable, UnauthorizedException } from '@nestjs/common';

import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import * as bcrypt from 'bcrypt';
import { IUseCase } from '../../../../common/use-case/use-case';
import { AuthRequestDto } from '../../../auth/dtos/request/auth-request.dto';
import { UserResponseDto } from '../../dtos/response/user-response.dto';
import { User } from '../../entities/user.entity';

export const FIND_USER_USE_CASE = 'IFindUserUseCase';

export type IFindUserUseCase = IUseCase<
  AuthRequestDto,
  UserResponseDto | undefined
>;

@Injectable()
export class FindUserUseCase implements IFindUserUseCase {
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
