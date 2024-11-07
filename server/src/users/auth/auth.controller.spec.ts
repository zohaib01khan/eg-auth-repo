import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    it('should return a token and user object', async () => {
      const result = { token: 'testToken', user: {} };
      const signUpDto: SignUpDto = {
        email: 'zohaib@email.com',
        password: 'test@123',
        name: 'Zohaib Khan',
      };

      jest.spyOn(authService, 'signUp').mockResolvedValue(result);

      expect(await authController.signUp(signUpDto)).toBe(result);
    });
  });

  describe('signIn', () => {
    it('should return a token and user object', async () => {
      const result = { token: 'testToken', user: {} };
      const signinDto: SigninDto = {
        email: 'zohaib@email.com',
        password: 'test@123',
      };

      jest.spyOn(authService, 'signIn').mockResolvedValue(result);

      expect(await authController.signIn(signinDto)).toBe(result);
    });
  });
});
