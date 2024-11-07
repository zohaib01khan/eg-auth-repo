import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environments } from './environments/environments';
import { warn } from 'console';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Authentication API')
    .setDescription('API documentation for the EG authentication task')
    .setVersion('1.0')
    .addBearerAuth() // Enable JWT Bearer auth in Swagger
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Access docs at /api-docs

  await app.listen(environments.port);
  warn(`BACKEND APP IS LISTENING TO PORT ${environments.port}`);
}
bootstrap();
