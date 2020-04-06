import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}

export class RegisterUserDto extends LoginUserDto {
  @IsString()
  @MinLength(1)
  name: string;
}
