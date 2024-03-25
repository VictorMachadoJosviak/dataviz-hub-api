import { Injectable } from '@nestjs/common';

import { users } from '../../../database/data';
import { UserResponseDto } from '../../dtos/response/user-response.dto';

@Injectable()
export class UsersService {
  async findOne(
    username: string,
    password: string,
  ): Promise<UserResponseDto | undefined> {
    const user = users.find((user) => user.username === username);

    if (user && user.password === password) {
      return {
        username: user.username,
        id: user.id,
      };
    }
  }
}
