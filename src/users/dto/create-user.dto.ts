import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  // Matches,
  IsEmail,
} from 'class-validator';
import { Match } from 'src/auth/decorators/match.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4, {
    message: 'Username is too short. It should be at least 4 characters long.',
  })
  @MaxLength(20, {
    message: 'Username is too long. It should be at most 20 characters long.',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, {
    message: 'Password is too short. It should be at least 4 characters long.',
  })
  @MaxLength(20, {
    message: 'Password is too long. It should be at most 20 characters long.',
  })
  // @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/, { message: 'Password is too weak. It must include uppercase, lowercase letters, and numbers.' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
