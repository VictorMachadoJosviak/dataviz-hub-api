import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/swagger/setup-swagger';

export async function buildApp(app: INestApplication) {
  app.setGlobalPrefix('api');
  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  buildApp(app);

  await app.listen(3000);
}
bootstrap();
