import { Module } from '@nestjs/common';
import { UsersService } from './services/user/users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
