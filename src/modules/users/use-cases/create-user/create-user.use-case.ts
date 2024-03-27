import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUseCase } from '../../../../common/use-case/use-case';
import { CreateUserDto } from '../../dtos/request/create-user.dto';
import { UserResponseDto } from '../../dtos/response/user-response.dto';
import { User } from '../../entities/user.entity';

export const CREATE_USER_USE_CASE = 'ICreateUserUseCase';

export type ICreateUserUseCase = IUseCase<CreateUserDto, UserResponseDto>;

const SALT_ROUNDS = 10;

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async execute(request: CreateUserDto): Promise<UserResponseDto> {
    const password = await bcrypt.hash(request.password, SALT_ROUNDS);

    const user = this.userRepository.create({
      name: request.name,
      email: request.email,
      password,
    });

    await this.userRepository.insert(user);

    return user.toDto();
  }
}
