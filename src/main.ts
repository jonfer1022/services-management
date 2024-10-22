import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/utils/handlerErrors';

async function bootstrap() {
  const port = process.env.PORT || 3001;
  const config = new DocumentBuilder()
    .setTitle('API documentation')
    .setDescription('This is a documentation for service management api')
    .setVersion('1.0')
    .addTag('Authentication')
    .addTag('Services')
    .addTag('UserServices')
    .addBearerAuth(
      {
        name: 'Authorization',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(port);
}
bootstrap();
