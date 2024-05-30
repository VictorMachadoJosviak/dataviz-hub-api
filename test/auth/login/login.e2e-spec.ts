import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { buildApp } from '../../../src/main';
import { CreateUserDto } from '../../../src/modules/users/dtos/request/create-user.dto';

export const registerUser = async (app: INestApplication) => {
  const user: CreateUserDto = {
    name: 'test',
    email: 'test',
    password: 'test',
  };

  const response = await request(app.getHttpServer())
    .post('/auth/register')
    .send(user);

  expect(response.body).toStrictEqual({
    id: expect.any(String),
    username: user.email,
    password: user.password,
  });

  expect(response.status).toBe(HttpStatus.CREATED);

  return response;
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    buildApp(app);

    await app.init();
  });

  afterEach(async () => {
    return app.close();
  });

  it('/auth/register', async () => {
    await registerUser(app);
  });
});
