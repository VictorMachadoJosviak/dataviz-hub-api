import { CreateUserDto } from '../../../src/modules/users/dtos/request/create-user.dto';

export const createUserFixture: CreateUserDto = {
  email: 'test@test.com',
  password: 'test',
  name: 'test',
};
