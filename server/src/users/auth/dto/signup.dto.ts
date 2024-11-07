import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ example: 'Zohaib Khan', description: 'User full name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly name: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid email!' })
  readonly email: string;

  @ApiProperty({
    example: 'Password123!',
    description:
      'Password with at least 8 characters, 1 letter, 1 number, and 1 special character',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
}
