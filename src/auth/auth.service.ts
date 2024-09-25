import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOneByUsername(
      createUserDto.username,
    );
    if (existingUser) throw new BadRequestException('User already exists');
    const existingEmail = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (existingEmail) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return await this.usersService.createUser({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findOneByUsernameWithPassword(
      loginUserDto.username,
    );
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { username: user.username, sub: user.id };
    const token = await this.jwtService.signAsync(payload);

    return { token, username: user.username };
  }
}
