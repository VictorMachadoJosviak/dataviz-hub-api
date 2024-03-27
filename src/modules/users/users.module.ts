import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, Provider } from '@nestjs/common';
import { User } from './entities/user.entity';
import {
  CREATE_USER_USE_CASE,
  CreateUserUseCase,
} from './use-cases/create-user/create-user.use-case';

const CreateUserUseCaseProvider: Provider = {
  provide: CREATE_USER_USE_CASE,
  useClass: CreateUserUseCase,
};

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [CreateUserUseCaseProvider],
  exports: [CreateUserUseCaseProvider],
})
export class UsersModule {}
