import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/swagger/setup-swagger';

const PORT = process.env.PORT || 3000;

export async function buildApp(app: INestApplication) {
  app.setGlobalPrefix('api');
  setupSwagger(app);

  app.enableCors();

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

  await app.listen(PORT);
}
bootstrap();
