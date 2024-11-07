import { Module } from '@nestjs/common';
import { AuthModule } from './users/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environments } from './environments/environments';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    MongooseModule.forRoot(environments.mongoUri),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
