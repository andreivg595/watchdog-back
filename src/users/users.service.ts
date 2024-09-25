import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password' | 'confirmPassword'>> {
    try {
      const user = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Error saving the user');
    }
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    try {
      return await this.usersRepository.findOne({ where: { username } });
    } catch (error) {
      throw new InternalServerErrorException('Error finding the user');
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      return await this.usersRepository.findOne({ where: { email } });
    } catch (error) {
      throw new InternalServerErrorException('Error finding the user by email');
    }
  }

  async findOneByUsernameWithPassword(
    username: string,
  ): Promise<User | undefined> {
    try {
      return await this.usersRepository.findOne({
        where: { username },
        select: ['id', 'username', 'email', 'password', 'role'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Error finding the user by email');
    }
  }
}
