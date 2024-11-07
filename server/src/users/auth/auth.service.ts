import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string; user: any }> {
    const { name, email, password } = signUpDto;

    const userDetails = await this.userModel.findOne({ email });
    if (userDetails) {
      throw new BadRequestException('Email already exists!');
    }

    // Hash the password with cost of 13
    const hashedPassword = await bcrypt.hash(password, 13);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });
    user.password = undefined;
    console.log('SignUp Details: ', { token, user });

    return { token, user };
  }

  async signIn(signinDto: SigninDto): Promise<{ token: string; user: any }> {
    const { email, password } = signinDto;

    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });
    user.password = undefined;

    console.log('SignIn Details: ', { token, user });
    return { token, user };
  }
}
