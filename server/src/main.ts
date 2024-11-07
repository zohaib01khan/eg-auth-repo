import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environments } from './environments/environments';
import { warn } from 'console';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());

  await app.listen(environments.port);
  warn(`BACKEND APP IS LISTENING TO PORT ${environments.port}`);
}
bootstrap();
