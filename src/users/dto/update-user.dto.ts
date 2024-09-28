import {
  IsString,
  IsOptional,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Match } from 'src/auth/decorators/match.decorator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(4, {
    message: 'Username is too short. It should be at least 4 characters long.',
  })
  @MaxLength(20, {
    message: 'Username is too long. It should be at most 20 characters long.',
  })
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20, {
    message: 'Password is too long. It should be at most 20 characters long.',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword?: string;

  @IsOptional()
  @IsString()
  role?: string;
}
