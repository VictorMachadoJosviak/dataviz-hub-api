import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, Provider } from '@nestjs/common';
import { User } from './entities/user.entity';
import {
  CREATE_USER_USE_CASE,
  CreateUserUseCase,
} from './use-cases/create-user/create-user.use-case';
import {
  FIND_USER_USE_CASE,
  FindUserUseCase,
} from './use-cases/find-user/find-user.use-case';

const CreateUserUseCaseProvider: Provider = {
  provide: CREATE_USER_USE_CASE,
  useClass: CreateUserUseCase,
};

const FindUserUseCaseProvider: Provider = {
  provide: FIND_USER_USE_CASE,
  useClass: FindUserUseCase,
};

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [FindUserUseCaseProvider, CreateUserUseCaseProvider],
  exports: [FindUserUseCaseProvider, CreateUserUseCaseProvider],
})
export class UsersModule {}
