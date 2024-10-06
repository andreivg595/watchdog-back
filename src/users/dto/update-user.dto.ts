import {
  IsString,
  IsOptional,
  IsEmail,
  MinLength,
  MaxLength,
  IsEnum,
  ValidateIf,
} from 'class-validator';
import { Match } from 'src/auth/decorators/match.decorator';
import { Role } from 'src/auth/enums/role.enum';

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
  @MinLength(4, {
    message: 'Password is too short. It should be at least 4 characters long.',
  })
  @MaxLength(20, {
    message: 'Password is too long. It should be at most 20 characters long.',
  })
  password?: string;

  @ValidateIf((o) => o.password)
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword?: string;

  @IsOptional()
  @IsEnum([Role.USER, Role.ADMIN], { message: 'Invalid role value.' })
  role?: string;
}
