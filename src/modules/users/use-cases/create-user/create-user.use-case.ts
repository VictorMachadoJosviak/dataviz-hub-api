import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { IUseCase } from '../../../../common/use-case/use-case';
import { users } from '../../../database/data';
import { CreateUserDto } from '../../dtos/request/create-user.dto';
import { UserResponseDto } from '../../dtos/response/user-response.dto';

export const CREATE_USER_USE_CASE = 'ICreateUserUseCase';

export type ICreateUserUseCase = IUseCase<CreateUserDto, UserResponseDto>;

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  async execute(request: CreateUserDto): Promise<UserResponseDto> {
    const user = {
      id: crypto.randomUUID(),
      username: request.username,
      password: request.password,
    };

    users.push(user);

    return user;
  }
}
