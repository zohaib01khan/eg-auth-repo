import { Module } from '@nestjs/common';
import { UserSchema } from '../schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { environments } from 'src/environments/environments';

@Module({
  imports: [
    JwtModule.register({
      secret: environments.jwtSecret,
      signOptions: { expiresIn: environments.jwtExpiration },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
