import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @MinLength(8)
  @ApiProperty({ type: String })
  password: string;
}

export class RegisterUserDto extends LoginUserDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ type: String })
  name: string;
}
