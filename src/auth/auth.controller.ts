import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'User data',
    type: CreateUserDto,
    examples: {
      example1: {
        summary: 'Basic User',
        value: {
          username: 'johndoe',
          email: 'johndoe@example.com',
          password: 'securePassword123',
          confirmPassword: 'securePassword123',
        },
      },
    },
  })
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.register(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    description: 'User data',
    type: LoginUserDto,
    examples: {
      example1: {
        summary: 'Basic User',
        value: {
          username: 'johndoe',
          password: 'securePassword123',
        },
      },
    },
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.login(loginUserDto);
    } catch (error) {
      throw error;
    }
  }
}
