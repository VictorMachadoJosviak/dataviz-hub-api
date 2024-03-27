import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../../../common/use-case/use-case';
import { UserResponseDto } from '../../dtos/response/user-response.dto';
import { User } from '../../entities/user.entity';

export const FIND_USER_USE_CASE = 'IFindUserUseCase';

export type IFindUserUseCase = IUseCase<string, UserResponseDto>;

@Injectable()
export class FindUserUseCase implements IFindUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async execute(userId: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException();
    }

    return user.toDto();
  }
}
