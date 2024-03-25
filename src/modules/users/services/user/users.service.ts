import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { UserResponseDto } from '../../dtos/response/user-response.dto';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: crypto.randomUUID(),
      username: 'john',
      password: 'changeme',
    },
    {
      id: crypto.randomUUID(),
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(
    username: string,
    password: string,
  ): Promise<UserResponseDto | undefined> {
    const user = this.users.find((user) => user.username === username);

    if (user && user.password === password) {
      return {
        username: user.username,
        id: user.id,
      };
    }
  }
}
